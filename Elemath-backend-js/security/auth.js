const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.access_token;
  const refreshtoken = req.refreshToken;
  console.log("Refresh token request cookies:", req.refreshToken);
  console.log("Refresh token request access_token:", token);
  if (!token) {
    if (refreshtoken){
      try {
        const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user data to req.user
        console.log("✅ Authenticated decoded:", decoded);
        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
    }
    return res.status(401).json({ message: 'Access denied. No token provided.' });
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