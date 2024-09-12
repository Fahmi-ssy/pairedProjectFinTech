const express = require('express');
const router = express.Router();
const InvestmentController = require('../controllers/investmentController');
const UserController = require('../controllers/userController');
const ensureAuthenticated = require('../middleware/auth');
const Controller = require('../controllers/controller');

// Home route
router.get('/', Controller.home);

// Investment routes
router.get('/investments/new', ensureAuthenticated, InvestmentController.createInvestmentForm);
router.post('/investments', ensureAuthenticated, InvestmentController.postCreateInvestment);

// User routes
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin);
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegisterForm);
router.get('/logout', ensureAuthenticated, UserController.logout); // Ensure only logged-in users can log out

module.exports = router;
