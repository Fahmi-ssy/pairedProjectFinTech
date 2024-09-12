const { Investment, Company } = require('../models');

class InvestmentController {

  static async createInvestmentForm(req, res) {
    try {
      const companies = await Company.findAll();
      res.render('create-investment', { companies });
    } catch (error) {
      res.send(error)
    }
  }

  static async postCreateInvestment(req, res) {
    const { name, description, amount, companyID } = req.body
    const userID = req.session.userId

    if (!userID) {
      return res.redirect('/login');
    }

    try {
      await Investment.create({
        name,
        description,
        amount,
        companyID,
        userID
      })
      res.redirect('/investments');
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = InvestmentController;
