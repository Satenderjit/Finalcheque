const Cheque = require('../models/Cheque');

// Verify a cheque by name and cheque number
const verifyCheque = async (req, res) => {
  try {
    const { name, chequeNumber } = req.body;

    // Validate input
    if (!name || !chequeNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name and cheque number are required'
      });
    }

    // Find the cheque in the database
    const cheque = await Cheque.findOne({
      name: new RegExp(`^${name}$`, 'i'), // Case insensitive match
      chequeNumber: new RegExp(`^${chequeNumber}$`, 'i') // Case insensitive match
    });

    if (!cheque) {
      // Return "Not Found" if cheque doesn't exist
      return res.status(200).json({
        success: true,
        status: 'Not Found',
        message: 'Cheque not found in the system'
      });
    }

    // Return the cheque status
    res.status(200).json({
      success: true,
      status: cheque.status,
      message: `Cheque status: ${cheque.status}`,
      cheque: {
        name: cheque.name,
        chequeNumber: cheque.chequeNumber,
        status: cheque.status
      }
    });
  } catch (error) {
    console.error('Error verifying cheque:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during cheque verification'
    });
  }
};

// Add a new cheque (Admin function)
const addCheque = async (req, res) => {
  try {
    const { name, chequeNumber, status } = req.body;

    // Validate input
    if (!name || !chequeNumber || !status) {
      return res.status(400).json({
        success: false,
        message: 'Name, cheque number, and status are required'
      });
    }

    // Check if cheque number already exists
    const existingCheque = await Cheque.findOne({ chequeNumber: new RegExp(`^${chequeNumber}$`, 'i') });
    if (existingCheque) {
      return res.status(400).json({
        success: false,
        message: 'Cheque number already exists'
      });
    }

    // Create new cheque
    const newCheque = new Cheque({
      name,
      chequeNumber,
      status
    });

    const savedCheque = await newCheque.save();

    res.status(201).json({
      success: true,
      message: 'Cheque added successfully',
      cheque: {
        name: savedCheque.name,
        chequeNumber: savedCheque.chequeNumber,
        status: savedCheque.status
      }
    });
  } catch (error) {
    console.error('Error adding cheque:', error);
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        success: false,
        message: 'Cheque number already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error during cheque addition'
    });
  }
};

module.exports = {
  verifyCheque,
  addCheque
};