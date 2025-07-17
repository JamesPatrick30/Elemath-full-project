// backend/routes/google.js
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const teacher_accoount = require('../models/teacher.js');
const dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_KEY);
const { createToken, verifyToken, verifyRefreshToken } = require('../security/createToken.js');
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_KEY,
    });

    let user = null;
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const existingUser = await teacher_accoount.findOne({ Email: email });
    if (!existingUser) {
      const newUser = new teacher_accoount({
        Email: email,
        profile: picture,
        password: 'password',
        class: [] // or don't set this at all if it's not needed yet
      });

      
      await newUser.save()
      .then((result) => {
        console.log('User saved successfully:', result);
        user = result;
      });
      console.log('New user created:', user);
    }else{
      user = existingUser;
    }

    const userpayload = {id: user._id, username: user.Email};
    console.log('userpayload created:', userpayload);

    res.cookie('access_token', createToken({ userpayload }).accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000 // 15 mins
    });
    res.cookie('refresh_token', createToken({ userpayload }).refreshToken, {
        httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 mins
    });
    res.status(200).json({ email, name, picture });
  } catch (err) {
    console.error('❌ Invalid Google ID Token', err);
    res.status(401).json({ message: 'Invalid Google ID Token' });
  }
});

module.exports = router;
