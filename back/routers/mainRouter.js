const express = require('express')
const { register, login, logout, isLogged } = require('../controllers/mainController')
const router = express.Router()
const { validateRegistration } = require('../middleware/validator')

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.get('/isLogged', isLogged)
router.get('/logout', logout)

module.exports = router
