const express = require('express');

const router = express.Router();

// Test endpoint to check if route is working
router.get('/test', async (req, res) => {
  try {
    res.json({ success: true, message: 'Route is accessible' });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test endpoint to check database connection
router.get('/db-test', async (req, res) => {
  try {
    // Try to import and use Cheque model
    const Cheque = require('../models/Cheque.js');

    // Just return a simple success message to test model import
    res.json({ success: true, message: 'Database model imported successfully' });
  } catch (error) {
    console.error('DB test route error:', error);
    res.status(500).json({ success: false, error: 'DB connection error: ' + error.message });
  }
});

// Retell AI webhook endpoint - this is called by Retell AI to execute custom functions
router.post('/webhook', express.json({ type: 'application/json' }), async (req, res) => {
  try {
    console.log('Webhook called with body:', JSON.stringify(req.body)); // Debug log

    // Access the parsed body directly
    const { function_call, function_name } = req.body;

    if (!function_call || !function_name) {
      return res.status(400).json({
        status: 400,
        data: {
          success: false,
          error: 'Invalid request format from Retell AI - missing function_call or function_name'
        }
      });
    }

    // Handle different custom functions based on function_name
    let result;

    switch (function_name) {
      case 'verify_cheque':
        result = await handleVerifyCheque(function_call);
        break;
      case 'add_cheque':
        result = await handleAddCheque(function_call);
        break;
      default:
        return res.status(400).json({
          status: 400,
          data: {
            success: false,
            error: `Unknown function: ${function_name}`
          }
        });
    }

    // Return the result in the format Retell AI expects
    res.json({
      status: 200,
      data: result
    });

  } catch (error) {
    console.error('Retell AI Webhook Error:', error);
    res.status(500).json({
      status: 500,
      data: {
        success: false,
        error: 'Internal server error: ' + error.message
      }
    });
  }
});

// Alternative endpoint if you prefer direct API calls for testing
router.post('/verify', express.json(), async (req, res) => {
  try {
    const { name, chequeNumber } = req.body;

    if (!name || !chequeNumber) {
      return res.json({
        success: false,
        message: 'Please provide both name and cheque number'
      });
    }

    const Cheque = require('../models/Cheque.js');

    const cheque = await Cheque.findOne({
      name: new RegExp(`^${name}$`, 'i'),
      chequeNumber: new RegExp(`^${chequeNumber}$`, 'i')
    });

    if (!cheque) {
      return res.json({
        success: true,
        status: 'Not Found',
        message: `No record found for cheque number ${chequeNumber}.`
      });
    }

    return res.json({
      success: true,
      status: cheque.status,
      message: `Cheque is ${cheque.status}`,
      cheque: {
        name: cheque.name,
        chequeNumber: cheque.chequeNumber,
        status: cheque.status
      }
    });

  } catch (error) {
    console.error('RETELL ERROR:', error);
    return res.json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Handler for cheque verification
async function handleVerifyCheque(params) {
  try {
    const { name, cheque_number } = params; // Note: Retell AI may send underscored params

    if (!name || !cheque_number) {
      return {
        success: false,
        message: 'Name and cheque number are required'
      };
    }

    const Cheque = require('../models/Cheque.js');

    const cheque = await Cheque.findOne({
      name: new RegExp(`^${name}$`, 'i'),
      chequeNumber: new RegExp(`^${cheque_number}$`, 'i')
    });

    if (!cheque) {
      return {
        success: true,
        status: 'Not Found',
        message: `No record found for cheque number ${cheque_number}.`
      };
    }

    return {
      success: true,
      status: cheque.status,
      message: `Cheque is ${cheque.status}`,
      cheque: {
        name: cheque.name,
        chequeNumber: cheque.chequeNumber,
        status: cheque.status
      }
    };
  } catch (error) {
    console.error('Error in handleVerifyCheque:', error);
    return {
      success: false,
      error: 'Database error during verification: ' + error.message
    };
  }
}

// Handler for adding a new cheque (you might want to restrict this based on your use case)
async function handleAddCheque(params) {
  try {
    const { name, cheque_number, status } = params;

    if (!name || !cheque_number || !status) {
      return {
        success: false,
        message: 'Name, cheque number, and status are required'
      };
    }

    const Cheque = require('../models/Cheque.js');

    // Check if cheque number already exists
    const existingCheque = await Cheque.findOne({
      chequeNumber: new RegExp(`^${cheque_number}$`, 'i')
    });

    if (existingCheque) {
      return {
        success: false,
        message: 'Cheque number already exists'
      };
    }

    // Create new cheque
    const newCheque = new Cheque({
      name,
      chequeNumber: cheque_number,
      status
    });

    const savedCheque = await newCheque.save();

    return {
      success: true,
      message: 'Cheque added successfully',
      cheque: {
        name: savedCheque.name,
        chequeNumber: savedCheque.chequeNumber,
        status: savedCheque.status
      }
    };
  } catch (error) {
    console.error('Error in handleAddCheque:', error);
    return {
      success: false,
      error: 'Database error during cheque addition: ' + error.message
    };
  }
}

// Health check for the retell endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Retell AI Integration is running!',
    endpoints: {
      webhook: 'POST /retell/webhook (for Retell AI functions)',
      verify: 'POST /retell/verify (for manual testing)',
      test: 'GET /retell/test (to test route accessibility)',
      db_test: 'GET /retell/db-test (to test database connectivity)'
    }
  });
});

module.exports = router;