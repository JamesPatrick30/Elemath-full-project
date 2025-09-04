const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const filesave = require('./models/lessonfile.js');
const axios = require("axios");
const nodemailer = require('nodemailer'); // ✅ use require instead of import
const multer = require('multer');
dotenv.config();

//redis client
const redisClient = require('./redis/redisClient.js');
const {init,pubClient,subClient} = require('./redis/redispubsub.js');

//websocket
// const WebSocket = require("ws");
const students = require('./models/students.js');
const teacher_accoount = require('./models/teacher.js');
const classes = require('./models/class.js');
const StudentClass = require('./models/student.js');
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;
const cookieParser = require('cookie-parser');

const  {createToken} = require('./security/createToken.js');
const verifyRefreshToken = require('./security/refreshtoken.js');
const auth = require('./security/auth.js');
const cookie = require("cookie");

//email


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


// const { createAdapter } = require('@socket.io/redis-adapter');

// const pubClient = redis.createClient({ url: process.env.REDIS_URL });
// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
//   io.adapter(createAdapter(pubClient, subClient));
//   console.log('✅ Redis adapter connected for Socket.IO');
// }).catch(err => {
//   console.error('❌ Redis connection error:', err);
// });

async function Cache(key, data) {
  const existingData = await redisClient.get(key);

  if (existingData) {
    console.log('Cache hit for key:', key);
    return JSON.parse(existingData);
  }

  // Proper usage: set(key, value, options)
  await redisClient.set(key, JSON.stringify(data), { EX: 3600 });

  console.log('cached : ' + key);
  return data;
}



app.use(express.static('public')); // Serve static files from 'public' directory

// Mount the upload route
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

  const studentData = await StudentClass.findById(studentId).populate('classId');

  if (!studentData) {
    return res.status(404).json({ message: 'Student not found' });
  }
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

app.post('/get/quarter', auth, async (req, res) => {
  const { quaterId } = req.body;

  const quarter = await Gradebook.findOne(
    { _id: quaterId },
    { _id: 0, quizzes: 1, classId: 1 }
  );

  if (!quarter) return res.status(404).json({ message: 'no quarter found' });

  // Flatten into student-based structure
  const studentMap = {};

  quarter.quizzes.forEach(quiz => {
    quiz.students.forEach(student => {
      if (!studentMap[student.lrn]) {
        studentMap[student.lrn] = {
          lrn: student.lrn,
          name: student.name,
          quiz: []
        };
      }
      studentMap[student.lrn].quiz.push({
        quizId: quiz.quizId,
        quizname: quiz.quizname,
        score: student.score,
        total: quiz.total
      });
    });
  });

  const arranged = Object.values(studentMap);

  res.json({ students: arranged });
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

async function casheTeacherData(req,res,next){
  const userId = req.user.id;
  const cacheKey = `teacher:${userId}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit for key:', cacheKey);
      return res.status(200).json(JSON.parse( cachedData));
    }
    next();
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 
app.get('/data/teacher',auth,casheTeacherData, async (req, res) => {
  try {
    // console.log('Authenticated user:', req.user);
    const user = await teacher_accoount.findById(req.user.id).populate('class');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await redisClient.set('teacher:${userId}', JSON.stringify(user), { EX: 3600 });
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
  


});
async function classCache(req,res,next){
  const {classId} = req.body;
  const cacheKey = `classData:${classId}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit for key:', cacheKey);
      return res.status(200).json(JSON.parse( cachedData));
    }
    next();
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
app.post('/get/classData',auth,classCache,async(req,res)=>{
  const {classId } = req.body;

  try{

    const classIn = await classes.findOne({_id : classId});
    if(!classIn) return res.status(404).json({message: 'class doesnt exist'});

    const list = await StudentClass.find({classId : classId});
    console.log('list :'+classIn);
    await redisClient.set(`classData:${classId}`, JSON.stringify(list), { EX: 3600 });
    res.status(200).json(list);
  }catch(err){
    console.log(err);
  }
});
async function cashChart(req,res,next){
    const classId  = req.query.classId; // or req.body depending on your client

    const datain = await redisClient.get(`chart:${classId}`);
    if(!datain){
      next();
      return;
    }
    console.log('hit chart cache');
    const modeData = JSON.parse(datain);
    const LineChart = modeData.LineChart;
    const BarChart = modeData.BarChart;
    const PieChart = modeData.PieChart;
    const ImprovementChart = modeData.ImprovementChart;
    const LowTopicBarChart = modeData.LowTopicBarChart;
    res.json({ LineChart, BarChart, PieChart, ImprovementChart, LowTopicBarChart });

}
app.get('/chart', auth,cashChart ,async (req, res) => {
  try {
    const classId  = req.query.classId; // or req.body depending on your client
    const gradebook = await Gradebook.findOne({ classId: classId })
      .sort({ dateCreated: -1 })   // sort descending by dateCreated
      .limit(1);
    if (!gradebook) return res.status(404).json({ message: 'No data found' });

    // console.log(JSON.stringify(gradebook));
    // --- LineChart: quiz averages ---
    // --- LineChart: quiz averages as percentage ---
    // take last 7 quizzes
    const latestQuizzes = gradebook.quizzes.slice(-7);

    const quizNames = latestQuizzes.map(q => q.quizname);

    // compute percentage = (totalAverage / total) * 100
    const quizAverages = latestQuizzes.map(q =>
      Math.floor((q.totalAverage / q.total) * 100)
    );

    const LineChart = {
      series: [{ name: "Quiz Average (%)", data: quizAverages }],
      options: {
        chart: { background: "#fff" },
        colors: ["#4fc4f7"],
        stroke: { curve: "smooth", width: 3 },
        xaxis: { categories: quizNames },
        grid: { borderColor: "#e0e0e0" },
        yaxis: { max: 100, min: 0, title: { text: "Percentage (%)" } }
      }
    };


    // --- BarChart: sort top scores of last quiz ---
    // --- BarChart: top 10 scores of last quiz ---
    const lastQuiz = gradebook.quizzes.at(-1);
    // --- BarChart: top 10 students by average grade across all quizzes ---
    const studentTotals = {}; // { lrn: { name, totalScore, quizzes } }

    // accumulate scores across quizzes
    for (const quiz of gradebook.quizzes) {
      for (const s of quiz.students) {
        if (!studentTotals[s.lrn]) {
          studentTotals[s.lrn] = { name: s.name, totalScore: 0, quizzes: 0 };
        }
        studentTotals[s.lrn].totalScore += s.score;
        studentTotals[s.lrn].quizzes += 1;
      }
    }

    // compute averages
    const studentAverages = Object.values(studentTotals).map(s => ({
      name: s.name,
      average: s.totalScore / s.quizzes * 10
    }));

    // sort and take top 10
    const topStudents = studentAverages
      .sort((a, b) => b.average - a.average)
      .slice(0, 10);

    const BarChart = {
      series: [{ name: "Average Score", data: topStudents.map(s => s.average) }],
      options: {
        chart: { background: "#fff" },
        colors: ["#FF9800"],
        plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
        xaxis: { categories: topStudents.map(s => s.name) }
      }
    };

    // console.log(sortedStudents.map(s => s.name));
    // --- PieChart: pass vs fail (last quiz) ---
    const passMark = Math.ceil(lastQuiz.total / 2); // pass if >=50%
    let pass = 0, fail = 0;
    lastQuiz.students.forEach(s => s.score >= passMark ? pass++ : fail++);

    const PieChart = {
      series: [fail, pass],
      options: {
        labels: ["Failed", "Pass"],
        colors: ["#FF5252", "#4CAF50"],
        legend: { position: "right" }
      }
    };

    // --- Improvement Chart: compare averages across quizzes ---
    const transitions = quizAverages.length - 1; // total number of comparisons
    const improvements = [];

    for (let i = 1; i < quizAverages.length; i++) {
      if (quizAverages[i] > quizAverages[i - 1]) improvements.push("Improved");
      else if (quizAverages[i] < quizAverages[i - 1]) improvements.push("Declined");
      else improvements.push("No Change");
    }

    const improvementCounts = {
      Improved: improvements.filter(v => v === "Improved").length,
      "No Change": improvements.filter(v => v === "No Change").length,
      Declined: improvements.filter(v => v === "Declined").length
    };

    // Convert counts to percentage
    const improvementPercentages = {};
    for (const key in improvementCounts) {
      improvementPercentages[key] = transitions > 0 
        ? (improvementCounts[key] / transitions) * 100 
        : 0;
    }

    const ImprovementChart = {
      series: Object.values(improvementPercentages),
      options: {
        labels: Object.keys(improvementPercentages),
        colors: ["#28a745", "#ffc107", "#dc3545"], // green, yellow, red
        legend: { position: "right" }
      }
    };


    // --- Topic Mastery BarChart: lowest performing topics ---
    const topicStats = {}; // { topic: { correct, total } }

    // aggregate per topic
    for (const quiz of gradebook.quizzes) {
      for (const q of quiz.questions) {
        if (!topicStats[q.topic]) {
          topicStats[q.topic] = { correct: 0, total: 0 };
        }
        topicStats[q.topic].correct += q.studentCorrect;
        topicStats[q.topic].total += quiz.students.length; // each student attempted
      }
    }

    // compute percentage per topic
    const topicPerformance = Object.entries(topicStats).map(([topic, stats]) => ({
      topic,
      percentage: stats.total > 0 ? Math.floor((stats.correct / stats.total) * 100) : 0
    }));

    // sort by weakest topics (ascending)
    const weakestTopics = topicPerformance.sort((a, b) => a.percentage - b.percentage);

    // Take bottom 5 topics to highlight weaknesses
    const LowTopicBarChart = {
      series: [{ name: "Mastery (%)", data: weakestTopics.slice(0, 5).map(t => t.percentage) }],
      options: {
        chart: { background: "#fff" },
        colors: ["#e53935"], // red to emphasize weak
        plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
        xaxis: { categories: weakestTopics.slice(0, 5).map(t => t.topic) },
        yaxis: { max: 100, min: 0, title: { text: "Percentage (%)" } }
      }
    };
    await redisClient.set(`chart:${classId}`, JSON.stringify({LineChart, BarChart, PieChart, ImprovementChart, LowTopicBarChart}), { EX: 3600 });
    res.json({ LineChart, BarChart, PieChart, ImprovementChart, LowTopicBarChart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/data/teacher/classname',auth,async (req,res)=>{
  const { classid } = req.body;
  console.log(classid);
  const classvar = await classes.findById(classid);

  if(!classvar) return res.status(404).json({message : 'Class not exist'});

  res.status(200).json({classname: classvar.Class_name});
});

app.post('/edit/student', auth ,async ( req,res )=>{
  
  try{
    const { lrn, fname, mname, lname,password } = req.body;

    const student = await StudentClass.findOne({ lrn :lrn});
    
    if (!student) return res.status(404).json({message : 'student not found'});
    const name =  lname + '. ' +fname  + ' ' + mname + ', ';
    console.log('the name is : '+ name);
    await StudentClass.updateOne(
      { lrn : lrn },
      { $set: {
          name:name,
          firstname: fname,
          middlename: mname,
          lastname: lname,
          password: password
        }
      }
    );
    await redisClient.del(`classData:${student.classId}`); // Clear cache for this class
    res.json({message : 'success'});
  }catch(err){
    console.log(err);
    res.status(500).json({message : 'server error'});
  }
});
app.delete('/remove/student', auth ,async ( req,res )=>{
  
  try{
    const { lrn } = req.body;

    const student = await StudentClass.findOne({ lrn : lrn });
    console.log('student : '+ student + ' lrn : '+ lrn);
    
    if (!student) return res.status(404).json({message : 'student not found'});

    const deletedata = await StudentClass.findOneAndDelete({lrn : lrn});
    await redisClient.del(`classData:${deletedata.classId}`); // Clear cache for this class
    console.log('deletedata: '+ deletedata);
    res.json({message : 'success'});
  }catch(err){
    console.log(err);
    res.status(500).json({message : 'server error'});
  }
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
        { headers: { "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY_AI // Include your API key here
         } }
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

app.post('/create/mode',auth,async (req,res)=>{
  const {id,mode}= req.body;

  const classFile =await Gradebook.findOne({classId:id});

  if(!classFile){
    return res.status(404).json({message: 'Need to create Grade Book'});
  }
  
  const createMode = { 
    quizId: id,
    start:false,
    quizMode: mode,
    gametime: 0,
    quizName: '',
    players: [],
    questions:[]
  };

  await redisClient.set(`mode:${id}`, JSON.stringify(createMode), { EX: 3600 });


  res.json({message:'done'})
});

app.post('/delete/mode', auth,async (req, res) => {
  const { id } = req.body;
  console.log('delete mode id:', id);

  // Count how many items match before deletion
  //const matches = list.filter(item => item.id === id).length;

  const matches =await redisClient.exists(`mode:${id}`);
  if (matches) {
    await redisClient.del(`mode:${id}`);

    // Notify all sockets in this room
    io.to(id).emit('mode-deleted', { message: 'Mode deleted', count: matches });

    return res.json({ message: `Deleted ${matches} mode(s)` });
  }

  res.status(404).json({ message: 'Mode not found' });
});

app.get('/get/mode', auth,async (req, res) => {
  const id = req.query.id;          // comes in as a string
  // console.log('get mode query:', req.query); // better logging
  // console.log('id:', id);

  // If list contains numbers, convert
  // const index = list.findIndex(item => String(item.id) === String(id));
  const quiz = await redisClient.get(`mode:${id}`);
  const data = JSON.parse(quiz);
  console.log(quiz);
  if (!quiz) {
    return res.json({ quiz: false,started:false });
  }
  if(data.start){
    res.json({ quiz: true,started:true});
    return
  }
  
  // console.log('ping')
  res.json({ quiz: true,started:false});
});

app.get('/get/mode/list', auth, async (req, res) => {
  try {
    const id = req.query.id; // comes in as a string
    const quiz = await redisClient.get(`mode:${id}`);

    if (!quiz) {
      return res.status(404).json({ message: 'No modes found' });
    }
    const list = JSON.parse(quiz);
    res.status(200).json({ list: list.players });
  }catch (error) {
    console.error('Error fetching mode list:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});
const lessonfile = require('./models/lessonfile.js');
app.get('/lesson/list',auth, async (req, res) => {
  const id = req.user.id; // Assuming the user ID is stored in the token payload
  const lessons = await lessonfile.find({ ownerId: id },{file:0, __v:0}).sort({ dateCreated: -1 }); // Sort by dateCreated in descending order

  if (!lessons || lessons.length === 0) {
    return res.status(404).json({ message: 'No lessons found' });
  }
  res.json({ files: lessons });
});
app.get('/get/mode/data',auth, async (req, res) => {
  const id = req.query.id; // comes in as a string
  console.log('get mode data query: pong', req.query); // better logging
  console.log('id:', id);

  const quiz = await redisClient.get(`mode:${id}`);
  if (!quiz) {
    return res.status(404).json({ message: 'No mode found' });
  }
  const modeData = JSON.parse(quiz);
  console.log('Mode data:', modeData);
  // Return only the players array
  res.status(200).json({ modeData: modeData.players });
});
app.get('/get/mode/question/1st',auth,async(req,res)=>{
  const mode =await redisClient.get(`mode:${req.user.classId}`);
  const modeData = JSON.parse(mode);
  let player = modeData.players.find(p => p.lrn === req.user.username);
  const qin = player.qIn;
  console.log('quizMode in get : ' + modeData.quizMode);
  // modeData.players.find(p => p.lrn === req.user.username).qIn+=1;
  res.json({question:modeData.questions[qin],done:false,time:modeData.gametime,quizMode:modeData.quizMode});
});
app.post('/get/mode/question', auth, async (req, res) => {
  const { answer } = req.body;
  const mode = await redisClient.get(`mode:${req.user.classId}`);
  console.log('mode in get : ' + mode);

  let modeData = JSON.parse(mode);
  let player = modeData.players.find(p => p.lrn === req.user.username);
  let scoreP = player.score;
  const qin = player.qIn;
  const question = modeData.questions[qin];

  console.log('answer input : ' + answer + ' real answer : ' + question.answer);

  // normalize answers (ignore case + spaces)
  const normalizedAnswer = answer.trim().toLowerCase();
  const normalizedCorrect = question.answer.trim().toLowerCase();

  if (normalizedAnswer === normalizedCorrect) {
    scoreP += 1;

    // update player score
    player.score += 1;

    // increment question's studentCorrect counter
    modeData.questions[qin].studentCorrect += 1;

    // save review with correct=true
    player.rev.push({ q: question, playerAnswer: answer, correct: true });
  } else {
    player.rev.push({ q: question, playerAnswer: answer, correct: false });
  }

  // check if this was the last question
  if ((qin + 1) === modeData.questions.length) {
    player.done = true;

    setgameData(`mode:${req.user.classId}`, modeData);

    await pubClient.publish(
      'action',
      JSON.stringify({
        id: req.user.classId,
        action: 'player-done',
        payload: { player: player.player, score: scoreP }
      })
    );

    res.json({ question: {}, done: true });
    return;
  }

  // otherwise, go to next question
  if (qin !== (modeData.questions.length - 1)) {
    player.qIn += 1;

    res.json({ question: modeData.questions[qin + 1], done: false });
    setgameData(`mode:${req.user.classId}`, modeData);
    return;
  }
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = file.originalname.toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error('Only images are allowed'));
  }
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route
app.post('/report/student', auth, upload.array('screenshots', 5), async (req, res) => {
  try {
    const nameuser = await StudentClass.findById(req.user.id).populate('classId');;
    const { name, email, module, description,suggestion } = req.body;
    const files = req.files || [];

    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    const info = await transporter.sendMail({
      from: `"ELEMATH" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_PROGRAMMER,
      subject: "🐞 Bug Report",
      text: `Bug Report
        From: ${nameuser.name || 'Anonymous'} <${req.user.username || 'N/A'}>
        Module: ${module || 'N/A'}
        Description: ${description || 'No description provided'}
        Suggestions: ${suggestion || 'No suggestions provided' }`,
      attachments
    });

    console.log("✅ Email sent:", info.messageId);
    res.json({ success: true, message: "Bug report sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending bug report." });
  }
});

app.get('/get/mode/player/done',auth,async(req,res)=>{
  const {id} = req.query;
  const data = await redisClient.get(`mode:${id}`);
  const modeData = JSON.parse(data);
  const players = modeData.players.filter(p => p.done);
  const playing = modeData.players.filter(p => !p.done);
  res.json({players:players,playing:playing});
});
app.get('/get/mode/player/rev',auth,async(req,res)=>{
  const data = await redisClient.get(`mode:${req.user.classId}`);
  
  const modeData = JSON.parse(data);
  const player = modeData.players.find(p => p.lrn === req.user.username);
  console.log(player);
  const rev = player.rev;
  res.json({rev:rev,score:player.score});
});
async function addQuizAndAnalysis(classId, quiz, chartPoint) {
  return await Gradebook.findOneAndUpdate(
    { classId },
    {
      $push: {
        quizzes: quiz,
        "analysis.lineChart": chartPoint
      }
    },
    { new: true, sort: { dateCreated: -1 } } // return updated doc
  ).exec();
}
app.post('/mode/finish',auth,async (req,res)=>{
  try {
    const { id } = req.body;

    // 1. Pull modeData from Redis
    const data = await redisClient.get(`mode:${id}`);
    if (!data) return res.status(404).json({ error: "Mode not found" });
    const modeData = JSON.parse(data);

    const players = modeData.players;  // present
    const allStudents = await StudentClass.find({ classId: id }); // enrolled

    // 2. Build quiz students list
    const quizStudents = allStudents.map(stud => {
      const player = players.find(p => p.lrn === stud.lrn);
      return player
        ? {
            lrn: stud.lrn,
            name: player.player,
            score: player.score ?? 0,
            done: player.done ?? true
          }
        : {
            lrn: stud.lrn,
            name: `${stud.name}`,
            score: 0,
            done: false
          };
    });

    // 3. Compute average
    const totalAverage =
      players.reduce((sum, s) => sum + s.score, 0) / players.length;

    // 4. Create new quiz entry from modeData
    const newQuiz = {
      quizId: modeData.quizId,
      quizname: modeData.quizName || new Date().toISOString().split('T')[0] ,
      total: modeData.questions.length,
      students: quizStudents,
      totalAverage,
      lowAnalysis: [], // could be derived: hardest Qs
      questions: modeData.questions.map((q, idx) => ({
        number: (idx + 1).toString(),
        topic:q.topic,
        question: JSON.stringify(q.question),
        answer: q.answer,
        choices: q.options,
        studentCorrect: q.studentCorrect
      }))
    };

    // 5. ApexChart data point
    const chartPoint = { x: newQuiz.quizname, y: totalAverage };

    // 6. Save into Gradebook
    const updated = await addQuizAndAnalysis(id, newQuiz, chartPoint);
    console.log(updated);
    await redisClient.del(`chart:${id}`);
    await redisClient.del(`mode:${id}`);

    res.json({
      message: "Quiz saved successfully",
    });
  } catch (err) {
    console.error("Error in /mode/done:", err);
    res.status(500).json({ error: "Server error" });
  }
})
app.post('/mode/done', auth, async (req, res) => {
  try {
    const { id } = req.body;

    // 1. Pull modeData from Redis
    const data = await redisClient.get(`mode:${id}`);
    if (!data) return res.status(404).json({ error: "Mode not found" });
    const modeData = JSON.parse(data);

    const players = modeData.players;  // present
    // const allStudents = await StudentClass.find({ classId: id }); // enrolled
    console.log(modeData.questions.length);
    let pass = 0;
    let failed = 0;
    for(const studs of players){
      const ave = studs.score / modeData.questions.length * 100;
      console.log(ave);
      if(ave >=50){
        pass+=1;
      }else{
        failed+=1;
      }
    }
    // 2. Build quiz students list
    // const quizStudents = allStudents.map(stud => {
    //   const player = players.find(p => p.lrn === stud.lrn);
    //   return player
    //     ? {
    //         lrn: stud.lrn,
    //         name: player.player,
    //         score: player.score ?? 0,
    //         done: player.done ?? true
    //       }
    //     : {
    //         lrn: stud.lrn,
    //         name: `${stud.name}`,
    //         score: 0,
    //         done: false
    //       };
    // });

    // // 3. Compute average
    // const totalAverage =
    //   players.reduce((sum, s) => sum + s.score, 0) / players.length;

    // // 4. Create new quiz entry from modeData
    // const newQuiz = {
    //   quizId: modeData.quizId,
    //   quizname: modeData.quizName || new Date().toISOString().split('T')[0] ,
    //   total: modeData.questions.length,
    //   students: quizStudents,
    //   totalAverage,
    //   lowAnalysis: [], // could be derived: hardest Qs
    //   questions: modeData.questions.map((q, idx) => ({
    //     number: (idx + 1).toString(),
    //     topic:q.topic,
    //     question: q.question,
    //     answer: q.answer,
    //     choices: q.options,
    //     studentCorrect: q.studentCorrect
    //   }))
    // };

    // // 5. ApexChart data point
    // const chartPoint = { x: newQuiz.quizname, y: totalAverage };

    // // 6. Save into Gradebook
    // const updated = await addQuizAndAnalysis(id, newQuiz, chartPoint);
    // console.log(updated);
    // await redisClient.del(`chart:${id}`);
    // await redisClient.del(`mode:${id}`);

    res.json({
      message: "Quiz saved successfully",
      pass:pass,
      failed:failed
    });
  } catch (err) {
    console.error("Error in /mode/done:", err);
    res.status(500).json({ error: "Server error" });
  }
});
const { buildQuiz } = require('./helper/windowcard.js');
// ...existing code...

// Minimal quiz endpoint
app.get('/quiz', auth, (req, res) => {
  const { difficulty = 'medium', operation = 'mixed', count = 10 } = req.query;
  console.log(`Generating quiz: difficulty=${difficulty}, operation=${operation}, count=${count}`);
  const n = Math.max(1, Math.min(500, parseInt(count, 10) || 10));
  const  questions  = buildQuiz(difficulty, operation, n);
  // const quiz = buildQuiz("medium", "subtraction", 12);
  console.log("Generated", questions.length, "questions");
  console.log(questions);
  res.json({ data:questions.questions });
});
async function setgameData(id,payload) {
  await redisClient.set(id, JSON.stringify(payload), { EX: 3600 });
}
//============================================redis=========================================================
init().then(async () => {
  // Subscribe to 'action' channel
  await subClient.subscribe("action", (data) => {
    const payload = JSON.parse(data);
    // payload: {id:data.roomId,action:'game-start',payload:{started:true}}
    io.to(payload.id).emit(payload.action,payload.payload);
  });
}).catch(err => console.error("Redis init error:", err));

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
socket.on('game-start', async (data) => {
  const mode = await redisClient.get(`mode:${data.roomId}`);
  let modeData = JSON.parse(mode);

  modeData.gametime = data.time;
  modeData.start = true;
  console.log('mode data : '+data.questions);
  // add studentCorrect:0 to each question
  modeData.questions = data.questions.map(q => ({
    ...q,
    studentCorrect: 0
  }));

  console.log('questions : ' + JSON.stringify(modeData.questions));
  console.log('mode data : ' + JSON.stringify(modeData));

  // store back in redis
  setgameData(`mode:${data.roomId}`, modeData);

  await pubClient.publish('action', JSON.stringify({
    id: data.roomId,
    action: 'game-start',
    payload: { started: true }
  }));
});

  socket.on('join-room',async (data) => {
      console.log(`User ${socket.id} joined room: ${data.roomId}`);
      socket.join(data.roomId);
      const mode =await redisClient.get(`mode:${data.roomId}`);
      if(!mode) {
        socket.emit('no-mode', { message: 'No mode found, please create one.' });
        return;
      }
      // Add player to mode in Redis
      const modeData = JSON.parse(mode);
      // Check if player already exists
      const playerExists = modeData.players.some(player => player.lrn === data.lrn);
      if (!playerExists) {
        modeData.players.push({ player: data.name, lrn: data.lrn, profile: data.profile,score:0,qIn:0,done:false,rev:[] });
        // await redisClient.set(`mode:${data.roomId}`, JSON.stringify(modeData), { EX: 3600 });
        setgameData(`mode:${data.roomId}`,modeData);
        console.log('Updated mode data:', modeData);

        await pubClient.publish('action',JSON.stringify({id:data.roomId,action:'player-joined',payload:{ player: data.name, lrn: data.lrn, profile: data.profile }}));
        // io.to(data.roomId).emit('player-joined', { player: data.name, lrn: data.lrn, profile: data.profile });
      } else {
        console.log(`Player with LRN ${data.lrn} already exists in mode.`);
      }
      // Notify all clients in the room about the new player
      
  });
  socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id}, username : ${socket.user.username}`);

      // Automatically remove all listeners for this socket
      socket.removeAllListeners();

      // Optional: do other cleanup (e.g., remove from room or active user list)
      // socket.leaveAll(); 
  });
});