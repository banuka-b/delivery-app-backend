const express = require('express')
const router = express.Router()
const { registerDelivery,getUserDeliveries } = require('../controllers/deliveryController');

router.post('/delivery',registerDelivery)
router.get('/delivery/:username', getUserDeliveries);

module.exports =router;