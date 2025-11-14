const express = require('express');
const router = express.Router();
const { verifyCheque, addCheque } = require('../controllers/chequeController');
const adminAuth = require('../middleware/adminAuth');

// Route to verify a cheque (for direct API calls)
router.post('/verify', verifyCheque);

// Route for admin to add a new cheque (protected)
router.post('/admin/add', adminAuth, addCheque);

module.exports = router;