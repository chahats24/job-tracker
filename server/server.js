const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// Connect to MongoDB then start server
mongoose.connect('mongodb://127.0.0.1:27017/jobtracker')
  .then(() => {
    app.listen(4000, () => {
      console.log('Connected to MongoDB!');
      console.log('Server running on port 4000');
    });
  })
  .catch(err => console.log(err));