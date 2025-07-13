// routes/otpRoutes.js
const express = require('express');
const router = express.Router(); // ✅ Define router first

const { sendOtp, verifyOtp } = require('../controllers/otpController');

router.post('/send', sendOtp);
router.post('/verify', verifyOtp);

module.exports = router;
