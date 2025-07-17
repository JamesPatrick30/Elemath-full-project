const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const teacher_account = require('./models/teacher'); // your DB model
const { createToken } = require('./security/createToken'); // your token creator

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,       // from Google Cloud
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    // Check if user exists in your database
    let user = await teacher_account.findOne({ Email: email });

    if (!user) {
      // Auto register the Google user (optional)
      user = await teacher_account.create({
        Email: email,
        password: '', // empty or use Google ID as placeholder
      });
    }

    // Attach user data for route to handle
    return done(null, {
      id: user._id,
      name: profile.displayName,
      email: user.Email
    });

  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;
