// routers/index.js
const express = require('express');
const router = express.Router();
const InvestmentController = require('../controllers/investmentController');
const UserController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth'); // Import the helper
const Controller = require('../controllers/controller');

// Home route (accessible without login)
const { Company, Investment } = require('../models');

router.get('/', async (req, res) => {
    try {
        if (req.session.user) {
            const investments = await Investment.findAll();
            res.render('home', {
                user: req.session.user,
                investments: investments,
            });
        } else {
          const companies = await Company.findAll();
            res.render('home', { user: null, companies: companies });
        }

    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching companies');
    }
  });

 

// Investment routes (only accessible if logged in)
router.get('/investments/new', ensureAuthenticated, InvestmentController.createInvestmentForm);
router.post('/investments', ensureAuthenticated, InvestmentController.postCreateInvestment);
router.get('/investments/:id/edit', ensureAuthenticated, InvestmentController.editInvestmentForm);

router.post('/investments/:id', ensureAuthenticated, InvestmentController.postEditInvestment);
router.post('/investments/delete/:id', ensureAuthenticated, InvestmentController.deleteInvestment);


// User routes
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin);
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegisterForm);
router.get('/logout', UserController.logout);

module.exports = router;
