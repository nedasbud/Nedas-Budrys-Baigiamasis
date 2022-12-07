const express = require('express')
const { register, login } = require('../controllers/mainController')
const router = express.Router()
const { validateRegistration } = require('../middleware/validator')

router.post('/register', validateRegistration, register)
router.post('/login', login)

module.exports = router
