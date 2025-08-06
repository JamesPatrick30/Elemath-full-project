const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config();
function createToken(user) {
    const accessToken = jwt.sign({ id: user.id, username: user.username },process.env.JWT_SECRET,{ expiresIn: '1m' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username },process.env.JWT_REFRESH_SECRET,{ expiresIn: '90d' });
    return { accessToken, refreshToken };
}
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return null;
    }
}
module.exports = {createToken, verifyToken, verifyRefreshToken};