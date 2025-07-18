
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refresh_token; // ✅ Use refresh_token for refresh flow
  console.log("🌀 Refresh token from cookies:", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // ✅ Use REFRESH_SECRET
    req.user = decoded; // decoded may contain { id, username, etc. }
    console.log("✅ Verified refresh token:", decoded);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired refresh token.' });
  }
}

module.exports = verifyRefreshToken;
