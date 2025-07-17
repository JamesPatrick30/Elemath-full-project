const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
dotenv.config();
const client = new OAuth2Client(
  '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com'
);
const teacher_accoount = require('./models/teacher.js');
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

const passport = require('./security/googleAuth.js'); // <- require your passport config
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

    const classCount = user.class.length;
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
    res.status(200).json({ message: 'Login successful', classCount: classCount });
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

// app.post('/google', async (req, res) => {
//   const { idToken } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com',
//     });

//     const payload = ticket.getPayload(); // contains email, name, picture, etc.
//     const email = payload.email;

//     // Check if user exists
//     let user = await teacher_accoount.findOne({ Email: email });

//     if (!user) {
//       // Create user if not found
//       user = new teacher_accoount({
//         Email: email,
//         password: '', // you may want to set a random string or null
//         // You can also store name or picture if needed
//       });
//       await user.save();
//     }

//     const { accessToken, refreshToken } = createToken({ username: email });

//     // Set cookies
//     res.cookie('access_token', accessToken, {
//       httpOnly: true,
//       sameSite: 'Lax',
//       secure: false,
//       maxAge: 15 * 60 * 1000,
//     });

//     res.cookie('refresh_token', refreshToken, {
//       httpOnly: true,
//       sameSite: 'Lax',
//       secure: false,
//       maxAge: 15 * 60 * 1000,
//     });

//     res.status(200).json({ message: 'Google login successful', user: payload });

//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).json({ message: 'Invalid Google ID Token' });
//   }
// });

// // Step 1: Redirect user to Google
// app.post('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Step 2: Handle Google callback
// app.get('/auth/google/callback',
//   passport.authenticate('google',{ failureRedirect: '/' }),
//   (req, res) => {
//     const user = req.user;
    
//     // Create your app's access and refresh tokens
//     const { accessToken, refreshToken } = createToken({ username: user.email });

//     res.cookie('access_token', accessToken, {
//       httpOnly: true,
//       sameSite: 'Lax',
//       secure: false,
//       maxAge: 15 * 60 * 1000,
//     });

//     res.cookie('refresh_token', refreshToken, {
//       httpOnly: true,
//       sameSite: 'Lax',
//       secure: false,
//       maxAge: 15 * 60 * 1000,
//     });

//     // Redirect to frontend after successful login
//     res.redirect('http://localhost:5173/th');
//   }
// );

// app.post('/sign-up', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({ message: 'Username and password are required' });
//     }
//     const user = await teacher_accoount.findOne({ Email: username })
//     if (!user) {
//         return res.status(401).json({ message: 'username already exist' });
//     }
    
//     const newUser = new teacher_accoount({
//         Email: username,
//         password: password,
//     });
//     try {
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// });

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });