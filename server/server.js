
require('dotenv').config();
const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from environment variables');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is missing from environment variables');
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);

// Connect to MongoDB, then start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');

    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
