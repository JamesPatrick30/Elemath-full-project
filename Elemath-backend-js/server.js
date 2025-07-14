const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// import auth from './security/auth.js';
const { createToken, verifyToken, verifyRefreshToken } = require('./security/createToken.js');
const auth = require('./security/auth.js');
// Load environment variables from .env file

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your frontend uses
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
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
app.get('/', (req, res) => {
    res.send('Welcome to the Elemath Backend API');
});
app.get('/api', (req, res) => {
    res.json({ message: 'API is running' });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Here you would typically check the username and password against your database
    if (username !== 'testuser' && password !== 'testpassword') {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.cookie('access_token', createToken({ username }).accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000 // 15 mins
    });
    res.cookie('refresh_token', createToken({ username }).refreshToken, {
        httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 mins
    });
    res.status(200).json({ message: 'Login successful', accessToken: createToken({ username }).accessToken });
    console.log('Login successful:', username);
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
app.post('createAccount', (req, res) => {
    const { username, password } = req.body;
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });