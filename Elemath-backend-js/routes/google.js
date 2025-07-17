// backend/routes/google.js
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com');

router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // ✅ Here you can now find/create a user in your DB
    // Example:
    // const user = await User.findOneAndUpdate(...)

    res.status(200).json({ email, name, picture });
  } catch (err) {
    console.error('❌ Invalid Google ID Token', err);
    res.status(401).json({ message: 'Invalid Google ID Token' });
  }
});

module.exports = router;
