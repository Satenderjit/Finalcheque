const mongoose = require('mongoose');

const chequeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  chequeNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Available', 'Used', 'Not Found'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
chequeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cheque', chequeSchema);