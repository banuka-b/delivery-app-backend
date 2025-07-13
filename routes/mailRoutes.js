const express = require('express');
const { sendWelcome } = require('../controllers/mailController');
const router = express.Router();

router.post('/welcome', sendWelcome);

module.exports = router;
