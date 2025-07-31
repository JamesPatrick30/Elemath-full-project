const jwt = require('jsonwebtoken');
const  {createToken} = require('./createToken');
function auth(req, res, next) {
  const token = req.cookies.access_token;
  console.log("Refresh token request cookies:", req.cookies.refresh_token);
  console.log("Refresh token request access_token:", token);
  if (!token) {
    const refreshToken = req.cookies.refresh_token; // ✅ Use refresh_token for refresh flow
      console.log("🌀 Refresh token from cookies:", refreshToken);
    
      if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided.' });
      }
    
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // ✅ Use REFRESH_SECRET
        req.user = decoded; // decoded may contain { id, username, etc. }
        console.log("✅ Verified refresh token:", decoded);
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
        next();
      } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
      }

    // const refresh_token = req.cookies.refresh_token;

    // if (!refresh_token) {
    //   return res.status(401).json({ message: 'Access denied. No token provided.' });
    // }

    // try {
    //   const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    //   req.user = decoded; // ✅ Attach user data to req.user
    //   console.log("✅ Authenticated decoded:", decoded);
    //   // Access token cookie (90 minutes)
    //   res.cookie('access_token', createToken(decoded).accessToken, {
    //       httpOnly: true,
    //       secure: false,       // true in production
    //       sameSite: 'lax',     // 'none' only if cross-site
    //       maxAge: 90 * 60 * 1000 // 90 minutes
    //   });

    //   // Refresh token cookie (90 days)
    //   res.cookie('refresh_token', createToken(decoded).refreshToken, {
    //       httpOnly: true,
    //       secure: false,       // true in production
    //       sameSite: 'lax',
    //       maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
    //   });
    //   console.log('the token rotated')
    //   next();
    // } catch (err) {
    //   return res.status(401).json({ message: 'Invalid or expired token.' });
    // }

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