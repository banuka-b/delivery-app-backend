const express = require('express')
const router = express.Router()
const {getAllUser,updateDel} = require('../controllers/adminController')

router.get('/admin',getAllUser)
router.put('/updatedel',updateDel)

module.exports = router;