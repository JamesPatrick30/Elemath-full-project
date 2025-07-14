const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Elemath Backend API');
});
app.get('/api', (req, res) => {
    res.json({ message: 'API is running' });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

});
app.post('createAccount', (req, res) => {
    const { username, password } = req.body;
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});