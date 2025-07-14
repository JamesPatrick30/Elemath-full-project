const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
import { verifyToken } from './createToken.js';

function auth(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  try {
    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).json({ message: 'Invalid token' });
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Access token expired or invalid' });
  }
}

function verifyRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token not found' });

}
module.exports = auth;