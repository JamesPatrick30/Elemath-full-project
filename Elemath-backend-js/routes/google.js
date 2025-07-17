// backend/routes/google.js
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const teacher_accoount = require('../models/teacher.js');
const client = new OAuth2Client('651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com');

router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  console.log("Received ID Token:", idToken);
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com',
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
