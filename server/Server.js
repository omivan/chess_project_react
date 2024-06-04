require('dotenv').config();
const express = require('express');
const connectDB = require('./config/Db');
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON

// Define routes
app.use('/api/games', require('./routes/Games'));
app.use('/api/users', require('./routes/User'));

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
