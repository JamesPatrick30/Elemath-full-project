const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const XLSX = require('xlsx');
// const Tesseract = require('tesseract.js');
// const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
// const { OAuth2Client } = require('google-auth-library');
// const router = express.Router();
const filesave = require('./models/lessonfile.js');
const axios = require("axios");
dotenv.config();


//websocket
const WebSocket = require("ws");

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
const cookie = require("cookie");
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

const { Server } = require("socket.io");

// Create WebSocket server attached to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your Vue dev URL
    credentials: true
  }
});


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

app.get('/list', (req, res) => {
    res.json({ message: list });
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

app.post('/student-login', async (req, res) => {
  const {email,password} = req.body;

  if (!email || !password) {
    return res.status(404).json({message:'invalid input'});
  }
  const student =await StudentClass.findOne({email:email});

  if(!student) return res.status(404).json({message:'Student not yet enrolled'});

  if (student.password !== password) return res.status(404).json({message:'Wrong password'});

  const payload = {id:student._id,username:student.email,classId:student.classId};

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
    res.status(200).json({ message: 'Login successful' });
    console.log('Login successful:', student.name);
})
app.get('/get/student/data', auth, async (req, res) => {
  const studentId = req.user.id; // Assuming the student ID is stored in the token payload
  console.log('Student ID from token:', studentId);

  const studentData = await StudentClass.findById(studentId).populate('classId');

  if (!studentData) {
    return res.status(404).json({ message: 'Student not found' });
  }

  console.log('Student data:', studentData);
  res.status(200).json({
    id: studentData._id,
    name: studentData.name,
    classId: studentData.classId,
    profile: studentData.profile,
    firstname: studentData.firstname,
    middlename: studentData.middlename,
    lastname: studentData.lastname,
    lrn: studentData.lrn,
    email: studentData.email
  });
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
    console.log("the create book :"+ result);
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

app.get('/data/teacher',auth, async (req, res) => {
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
    console.log("User ID from token:", id);
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
  if(!rawText){
    console.log('no file');
    return res.status(404).json({message:'sada'});
    
  }
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
const dumpQuiz = require('./models/dumpquiz.js');
let list = []; 
app.post('/create/mode',auth,async (req,res)=>{
  const {id,mode}= req.body;

  const classFile =await Gradebook.findOne({classId:id});

  if(!classFile){
    return res.status(404).json({message: 'Need to create Grade Book'});
  }
  
  const createMode = new dumpQuiz({ 
    quizId: id,
    quizMode: mode,
    quizName: '',
    players: []
  });

  await createMode.save();
  // list.push({
  //   id:id,
  //   mode,mode
  // });

  res.json({message:'done'})
});

app.post('/delete/mode', auth,async (req, res) => {
  const { id } = req.body;
  console.log('delete mode id:', id);

  // Count how many items match before deletion
  //const matches = list.filter(item => item.id === id).length;

  const matches =await dumpQuiz.findOne({ quizId: id });
  if (matches) {
    // Keep only those that don't match the id
    // list = list.filter(item => item.id !== id);
    await dumpQuiz.deleteOne({ quizId: id });

    // Notify all sockets in this room
    io.to(id).emit('mode-deleted', { message: 'Mode deleted', count: matches });

    return res.json({ message: `Deleted ${matches} mode(s)` });
  }

  res.status(404).json({ message: 'Mode not found' });
});

app.get('/get/mode', auth, (req, res) => {
  const id = req.query.id;          // comes in as a string
  console.log('get mode query:', req.query); // better logging
  console.log('id:', id);

  // If list contains numbers, convert
  // const index = list.findIndex(item => String(item.id) === String(id));
  const quiz = dumpQuiz.find({ quizId: id });

  if (!quiz) {
    return res.json({ quiz: true });
  }
  res.status(404).json({ quiz: false});
});

app.get('/get/mode/list', auth, async (req, res) => {
  try {
    const id = req.query.id; // comes in as a string
    const list = await dumpQuiz.findOne({quizId:id}, { quizId: 1, quizMode: 1, _id: 0 });

    res.status(200).json({ list: list });
  }catch (error) {
    console.error('Error fetching mode list:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});
// Middleware to read cookie token
io.use((socket, next) => {
  // console.log("Handshake headers:", socket.handshake.headers);

  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const refreshToken = cookies.refresh_token; // change to your cookie name
  // console.log("Parsed cookies:", cookies);

  const token = cookies.access_token; // change to your cookie name
  if (!refreshToken) {
    console.log("No token found, rejecting connection");
    return next(new Error("Authentication error"));
  }
  try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      console.log("✅ Authenticated decoded in socket :", decoded);
      socket.user = decoded; // Attach user data to socket
      // next();
    } catch (err) {
      console.error("❌ Invalid token:", err.message);
      return next(new Error("Authentication error"));
    }
  next();
});


io.on("connection", (socket) => {
  console.log("Client connected:", socket.user.username);

  if(!socket.user || !socket.user.classId) {
    console.log("Teacher : ", socket.user.username);
    // return socket.disconnect();
  }
  if(!socket.user){
    console.log("No user data found in socket, disconnecting...");
    return socket.disconnect();
  }
  socket.join(socket.user?.classId); // Join a room based on user ID
    // Handle user disconnect
  socket.on('create-room', (data) => {
      console.log(`User ${socket.id} created room: ${data.roomId}`);
      socket.join(data.roomId);
      io.to(data.roomId).emit('room-created', { message: 'join please' });
      // socket.emit('room-created', { roomId: data.roomId });
  });
  socket.on('join-room', (data) => {
      console.log(`User ${socket.id} joined room: ${data.roomId}`);
      socket.join(data.roomId);
      io.to(data.roomId).emit('player-joined', { player: data.name, lrn: data.lrn, profile: data.profile });
  });
  socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id}, username : ${socket.user.username}`);

      // Automatically remove all listeners for this socket
      socket.removeAllListeners();

      // Optional: do other cleanup (e.g., remove from room or active user list)
      // socket.leaveAll(); 
  });
});