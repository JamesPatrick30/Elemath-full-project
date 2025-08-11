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
const filesave = require('./models/lessonfile.js');
const axios = require("axios");
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

const lessonRoutes = require("./routes/lesson");
app.use('/lesson',lessonRoutes);

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
        maxAge: 90 * 60 * 1000, // 90 minutes
        path:'/'
    });

    // Refresh token cookie (90 days)
    res.cookie('refresh_token', createToken(payload).refreshToken, {
        httpOnly: true,
        secure: false,       // true in production
        sameSite: 'lax',
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
        path:'/'
    });

    res.status(200).json({ message: 'Login successful', classCount: classCount });
    console.log('Login successful:', username);
});
const Gradebook = require('./models/grade.js');

app.post('/get/quarter',auth,async (req,res)=>{
  const {quaterId} = req.body;

  const quarter = await Gradebook.findOne({_id:quaterId},{_id:0,quizzes:1});

  if (!quarter) return res.status(404).json({message:'no quarter fund'});

  res.json({quizzes:quarter.quizzes});
  console.log('quater : '+ quarter);

});

app.post('/get/classrecord/Id',auth,async(req,res)=>{
  const {classId}= req.body;

  const records = await Gradebook.find({classId:classId},{gradingPeriod:1}).sort({ dateCreated: -1 }); // latest first

  if (!records) return res.status(404).json({count : 0});

  console.log('record in :'+classId +' ,' + records);
  res.json({count: records.length,records: records});

});

app.post('/create/record', auth, async (req, res) => {
  try {
    const { classId, gradingPeriod } = req.body;

    // 1. Make sure we don't already have a record for this class & period
    const existing = await Gradebook.findOne({ classId, gradingPeriod });
    if (existing) {
      return res.status(400).json({ message: "Gradebook already exists for this class and grading period." });
    }
    console.log('classId : '+classId + ' gradingPeriod : '+gradingPeriod);
    // 2. Get all students in the class
    const students = await StudentClass.find(
      { classId:classId },
      { lrn: 1, name: 1, _id: 0 } // projection
    );

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this class." });
    }

    // 3. Create new gradebook
    const book = new Gradebook({
      classId,
      gradingPeriod,
      students
    });

    const result = await book.save(); // ✅ await here
    console.log(result);
    // 4. Respond with result
    res.status(201).json({ message: 'Gradebook created successfully.', result });

  } catch (error) {
    console.error("Error creating gradebook:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
const jwt = require('jsonwebtoken');
app.post('/refresh-token', verifyRefreshToken, (req, res) => {
  // console.log("Refresh token request cookies:", req.refreshToken);
    const refreshToken = req.cookies.refresh_token;
    const accessToken = req.cookies.access_token;
    if(accessToken){
      try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        console.log('\x1b[46m%s\x1b[0m','the token is not rotated');
        res.status(200).json({ message: 'Access token is ok' });
        return;
      }catch(err){
        console.log(err);
      }
    }
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }
    try {
        const payload = req.user ;
        res.cookie('access_token', createToken(payload).accessToken, {
            httpOnly: true,
            secure: false,       // true in production
            sameSite: 'lax',     // 'none' only if cross-site
            maxAge: 90 * 60 * 1000, // 90 minutes
            path:'/'
        });

        // Refresh token cookie (90 days)
        res.cookie('refresh_token', createToken(payload).refreshToken, {
            httpOnly: true,
            secure: false,       // true in production
            sameSite: 'lax',
            maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
            path:'/'
        });
        console.log('\x1b[43m%s\x1b[0m','all token is rotated in refresh token api');
        res.status(200).json({ message: 'Access token refreshed' });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

app.get('/data/teacher', verifyRefreshToken,auth, async (req, res) => {
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

    console.log('Class created and teacher updated.'+savedClass);
    res.json({ id: savedClass._id });

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
app.get('/role', auth, async (req, res) => {
  try {
    const id = req.user?.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid token payload." });
    }

    // Check teacher
    const teacher = await teacher_accoount.findById(id).populate('class');
    if (teacher) {
      console.log("✅ Teacher role found :", teacher);
      return res.json({
        role: 'teacher',
        class: teacher.class
      }); // <-- return prevents further code
    }

    // Check student
    const studentrole = await StudentClass.findOne({ _id: id });
    if (studentrole) {
      return res.json({ role: 'student' });
    }

    // If neither
    return res.status(404).json({ message: 'User role not found' });

  } catch (error) {
    console.error("🔥 Error in /role:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.get('/get/grade/class',auth,async(req,res)=>{
  const id = req.user.id;

  try{
    const data = await teacher_accoount.findById(id,{class:1,_id:0});
    console.log(data);
    return res.json({data:data.class});
  }catch(err){
    console.log(err);
  }
});
app.post('/create-question',auth ,async(req,res)=>{
  const {fileId,num_questions,language,difficulty,question_type} = req.body;

  const file = await filesave.findById(fileId);
  const rawText = file.file;
  let quiz = '';
  try {
      const fastapiResponse = await axios.post(
        "http://127.0.0.1:8000/generate-quiz", // FastAPI endpoint
        { rawText,num_questions,language,difficulty,question_type }, // Send as JSON object
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📨 FastAPI replied:",fastapiResponse.data);
      let rawString = fastapiResponse.data.quiz;
      rawString = rawString.replace(/```json|```/g, '').trim();

      
      try {
        quiz = JSON.parse(rawString);
        console.dir(quiz, { depth: null });
      } catch (err) {
        console.error('❌ Invalid JSON:', err.message);
      }
    } catch (fastapiErr) {
      console.error("❌ Error sending to FastAPI:", fastapiErr.message);
    }
    res.json({quiz:quiz});
});