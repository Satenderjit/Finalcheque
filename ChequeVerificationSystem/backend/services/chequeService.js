const Cheque = require('../models/Cheque');

// Service to add sample cheques for testing
const addSampleCheques = async () => {
  try {
    const sampleCheques = [
      {
        name: 'John Doe',
        chequeNumber: 'CK001',
        status: 'Available'
      },
      {
        name: 'Jane Smith',
        chequeNumber: 'CK002',
        status: 'Used'
      },
      {
        name: 'Robert Johnson',
        chequeNumber: 'CK003',
        status: 'Available'
      },
      {
        name: 'Emily Davis',
        chequeNumber: 'CK004',
        status: 'Not Found'
      }
    ];

    // Check if cheques already exist to avoid duplicates
    const existingCount = await Cheque.countDocuments();
    if (existingCount === 0) {
      await Cheque.insertMany(sampleCheques);
      console.log('Sample cheques added successfully');
    } else {
      console.log(`Found ${existingCount} existing cheques in the database`);
    }
  } catch (error) {
    console.error('Error adding sample cheques:', error);
  }
};

module.exports = {
  addSampleCheques
};