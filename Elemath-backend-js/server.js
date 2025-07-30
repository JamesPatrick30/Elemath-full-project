const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const XLSX = require('xlsx');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
dotenv.config();
// const client = new OAuth2Client(
//   '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com'
// );
const students = require('./models/students.js');
const teacher_accoount = require('./models/teacher.js');
const classes = require('./models/class.js');
const StudentClass = require('./models/student.js');

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// import auth from './security/auth.js';
const  {createToken} = require('./security/createToken.js');
const verifyRefreshToken = require('./security/refreshtoken.js');
const auth = require('./security/auth.js');
// Load environment variables from .env file

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your frontend uses
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

const passport = require('./security/googleAuth.js'); // <- require your passport config
const student = require('./models/student.js');
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
mongoose.connect(uri)
  .then(() => {
    server.listen(PORT,() => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    console.log('✅ Connected to MongoDB Atlas')
  })
  .catch(err => console.error('❌ Connection error:', err));
// Routes
const uploadRouter = require('./routes/upload.js');

app.use('/', uploadRouter); // Mount upload route

const uploadlist = require('./routes/uploadlist.js');
const Student = require('./models/students.js');

app.use('/',uploadlist);

app.use('/', require('./routes/google'));
app.get('/', (req, res) => {
    res.send('Welcome to the Elemath Backend API');
});
app.get('/api', (req, res) => {
    res.json({ message: 'API is running' });
});
app.post('/api/login',async (req, res) => {
    const { username, password } = req.body;
    console.log("Login request body:", req.body);
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await teacher_accoount.findOne({ Email: username });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    // Here you would typically check the username and password against your database
    if (user.password !== password) {
        return res.status(401).json({ message: 'wrong password' });
    }
    const payload = {id: user._id, username: user.Email};
    const classCount = user.class.length;
    // Access token cookie (90 minutes)
    res.cookie('access_token', createToken(payload).accessToken, {
        httpOnly: true,
        secure: false,       // true in production
        sameSite: 'lax',     // 'none' only if cross-site
        maxAge: 90 * 60 * 1000 // 90 minutes
    });

    // Refresh token cookie (90 days)
    res.cookie('refresh_token', createToken(payload).refreshToken, {
        httpOnly: true,
        secure: false,       // true in production
        sameSite: 'lax',
        maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
    });

    res.status(200).json({ message: 'Login successful', classCount: classCount });
    console.log('Login successful:', username);
});
// app.post('/refresh-token', verifyRefreshToken, (req, res) => {
//   console.log("Refresh token request cookies:", req.refreshToken);
//     const refreshToken = req.cookies.refresh_token;
//     if (!refreshToken) {
//         return res.status(401).json({ message: 'No refresh token provided' });
//     }
//     try {
//         const newAccessToken = createToken( req.user ).accessToken;
//         res.cookie('access_token', newAccessToken, {
//             httpOnly: true,
//             secure: false, // use true if HTTPS
//             sameSite: 'lax',
//             maxAge: 90 * 60 * 1000 // 15 mins
//         });
//         res.cookie('refresh_token', createToken( req.user ).refreshToken, {
//             httpOnly: true,
//             secure: false, // use true if HTTPS
//             sameSite: 'lax',
//             maxAge: 90 * 24 * 60 * 60 * 1000 // 15 mins
//         });
//         console.log('Access token refreshed');
//         res.status(200).json({ message: 'Access token refreshed' });
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/api/logout', (req, res) => {
    console.log("Logout request cookies:", req.cookies);
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false // use true if HTTPS
  });
  res.clearCookie('refresh_token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false
  });
  console.log('User logged out');

  res.status(200).json({ message: 'Logged out successfully' });
  
});
app.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if user already exists by email
    const existingUser = await teacher_accoount.findOne({ Email: username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' }); // 409 = Conflict
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 12);

    // Save new user
    const newUser = new teacher_accoount({
      Email: username,
      password: password,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/data/teacher', auth, async (req, res) => {
  try {
    // console.log('Authenticated user:', req.user);
    const user = await teacher_accoount.findById(req.user.id).populate('class');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/teacher/changeProfile',auth,async(req,res)=>{
  const {profile} = req.body;

  const user = await teacher_accoount.findOne({_id:req.user.id});

  if (!user) { return res.status(404).json({message: 'user not found'}); }
  try{

    await teacher_accoount.updateOne(
        { _id : req.user.id },
        {$set : { profile : profile}}
      );
    
    return res.json({message:'done'})
  }catch(err){
    console.log('error is : '+ err);
  }
});
app.post('/find-student', auth, async (req, res) => {
  const { lrn } = req.body;

  const student = await students.findOne({ lrn:lrn });

  if (!student) return res.status(404).json({ message: 'Student not found' });

  res.status(200).json(student);
});
app.post('/createClass', auth, async (req, res) => {
  const { ClassName } = req.body;

  try {
    // 1. Create and save the class
    const newClass = new classes({
      Class_name: ClassName,
      teacherId: req.user.id
    });

    const savedClass = await newClass.save(); // use await properly

    // 2. Update the teacher's class array with correct structure
    await teacher_accoount.updateOne(
      { _id: req.user.id },
      {
        $push: {
          class: {
            Class_id: savedClass._id.toString(),
            Class_name: ClassName
          }
        }
      }
    );

    console.log('Class created and teacher updated.');
    res.json({ message: 'created' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/enroll-student',auth,async(req,res)=>{
  const { profile, fname, mname, lname, lrn, password, classId, email } = req.body;

  const student = await StudentClass.findOne({lrn:lrn});

  if (student) return res.status(409).json({message: 'Student already enrolled!'});
  try{
    const studentenrolled = await StudentClass({
        profile:profile,
        firstname:fname,
        middlename:mname,
        lastname:lname,
        lrn:lrn,
        email:lrn,
        password:password,
        classId:classId
    });

    const saveStudent = await studentenrolled.save();

    await classes.updateOne(
      { _id: classId },
      {
        $push: {
          studentIds: saveStudent._id.toString(),
        }
      }
    );
    console.log('Class created and teacher updated.');
    res.json({ message: 'created' });
  }catch(err){
    console.log(err);
  }
  


})
app.post('/get/classData',auth,async(req,res)=>{
  const {classId } = req.body;

  try{
    const classIn = await classes.findOne({_id : classId});
    if(!classIn) return res.status(404).json({message: 'class doesnt exist'});

    const list = await StudentClass.find({classId : classId});
    console.log('list :'+classIn);
    res.status(200).json(list);
  }catch(err){
    console.log(err);
  }
});

app.post('/data/teacher/classname',auth,async (req,res)=>{
  const { classid } = req.body;
  console.log(classid);
  const classvar = await classes.findById(classid);

  if(!classvar) return res.status(404).json({message : 'Class not exist'});

  res.status(200).json({classname: classvar.Class_name});
});

app.delete('/remove/student', auth ,async ( req,res )=>{
  const { lrn } = req.body;

  const student = await StudentClass.findOne({ lrn : lrn });

  if (!student) return res.status(404).json({message : 'student not found'});

  const deletedata = await StudentClass.findOneAndDelete({lrn : lrn});

  console.log(deletedata);
  res.json({message : 'success'});
});
app.post('/admin/trim-students', async (req, res) => {
  try {
    const studentsin = await students.find();

    for (let student of studentsin) {
      let updated = false;

      ['lrn', 'lastName', 'firstName', 'middlename', 'section'].forEach(field => {
        if (student[field] && typeof student[field] === 'string') {
          const trimmed = student[field].trim();
          if (trimmed !== student[field]) {
            student[field] = trimmed;
            updated = true;
          }
        }
      });

      if (updated) {
        try {
          await student.save();
        } catch (err) {
          console.error('Failed to save:', student._id, err);
        }
      }
    }


    res.status(200).json({ message: 'All student strings trimmed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Trimming failed', error });
  }
});
app.get('/role',auth,async(req,res)=>{
  const id = req.user.id;

  const teacher = await teacher_accoount.findById(id);

  if (teacher) {
    return res.json({
      role:'teacher',
      class:teacher.class
    });
  }

  const studentrole = await StudentClass.findById(id);

  if(studentrole){
    return res.json({
      role:'student'
    });
  }

  res.json({login:true});
});
// // Set up Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = './uploads';
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now();
//     cb(null, `${timestamp}-${file.originalname}`);
//   }
// });
// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     let students = [];

//     if (req.file.mimetype.includes('pdf')) {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdfParse(dataBuffer);
//       const lines = pdfData.text.split('\n');

//       lines.forEach(line => {
//         const match = line.match(/(\d{12})\s+(.+?)\s+(Section\s+.+)/i); // Adjust this regex as needed
//         if (match) {
//           students.push({
//             LRN: match[1],
//             name: match[2].trim(),
//             section: match[3].trim()
//           });
//         }
//       });

//     } else if (
//       req.file.mimetype.includes('excel') ||
//       req.file.originalname.endsWith('.xlsx') ||
//       req.file.originalname.endsWith('.xls')
//     ) {
//       const workbook = XLSX.readFile(filePath);
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       jsonData.forEach((row) => {
//         if (typeof row[0] === 'number' && String(row[0]).length === 12) {
//           students.push({
//             LRN: String(row[0]),
//             name: row[1] || '',
//             section: row[2] || ''
//           });
//         }
//       });
//     }

//     res.json({ students });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'File processing failed.' });
//   }
// });