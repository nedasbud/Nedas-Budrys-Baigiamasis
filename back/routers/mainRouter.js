const express = require('express')
const router = express.Router()
const { validateRegistration } = require('../middleware/validator')

router.post('/register', validateRegistration, register)
router.post('/login', login)

module.exports = router
