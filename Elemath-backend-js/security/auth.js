const jwt = require('jsonwebtoken');
const  {createToken} = require('./createToken');
function auth(req, res, next) {
  const token = req.cookies.access_token;
  console.log("Refresh token request cookies:", req.cookies.refresh_token);
  console.log("Refresh token request access_token:", token);
  if (!token) {

    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
      req.user = decoded; // ✅ Attach user data to req.user
      console.log("✅ Authenticated decoded:", decoded);
      // Access token cookie (90 minutes)
      res.cookie('access_token', createToken(decoded).accessToken, {
          httpOnly: true,
          secure: false,       // true in production
          sameSite: 'lax',     // 'none' only if cross-site
          maxAge: 90 * 60 * 1000 // 90 minutes
      });

      // Refresh token cookie (90 days)
      res.cookie('refresh_token', createToken(decoded).refreshToken, {
          httpOnly: true,
          secure: false,       // true in production
          sameSite: 'lax',
          maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
      });
      console.log('the token rotated')
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user data to req.user
    console.log("✅ Authenticated decoded:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = auth;