// backend/routes/google.js
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const teacher_accoount = require('../models/teacher.js');
const dotenv = require('dotenv');
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_KEY);

router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_KEY,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const existingUser = await teacher_accoount.findOne({ Email: email });
    if (!existingUser) {
      const newUser = new teacher_accoount({
        Email: email,
        password: 'password',
        class: [] // or don't set this at all if it's not needed yet
      });

      
      await newUser.save();
      console.log('New user created:', newUser);
    }

    res.status(200).json({ email, name, picture });
  } catch (err) {
    console.error('❌ Invalid Google ID Token', err);
    res.status(401).json({ message: 'Invalid Google ID Token' });
  }
});

module.exports = router;
