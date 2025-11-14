const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const { addSampleCheques } = require('./services/chequeService');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Add sample cheques on startup
addSampleCheques();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cheques', require('./routes/chequeRoutes'));
app.use('/retell', require('./routes/retellRoutes')); // Retell AI routes

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Cheque Verification API is running! (Updated from local)' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});