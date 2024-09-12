const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const userController = require('../controllers/userController')

// get register
router.get('/register',userController.registerForm )
// post register
router.post('/register',userController.postRegisterForm )
//login
router.get('/login', userController.loginForm)
//post login
router.post('/login', userController.postLogin)

 





module.exports =router