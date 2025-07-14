const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Elemath Backend API');
});
app.get('/api', (req, res) => {
    res.json({ message: 'API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});