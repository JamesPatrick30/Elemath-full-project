const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
mongoose.connect(uri)
  .then(() => {
    server.listen(PORT,() => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    console.log('✅ Connected to MongoDB Atlas')
  })
  .catch(err => console.error('❌ Connection error:', err));
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
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });