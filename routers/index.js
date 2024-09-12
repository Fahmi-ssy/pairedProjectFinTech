const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.displayAllInvestmen )




module.exports =router