const { Investment, Company, InvestmentType } = require('../models');

class InvestmentController {
    static async createInvestmentForm(req, res) {
        try {
            const companies = await Company.findAll(); // Fetch all companies
            const investmentTypes = await InvestmentType.findAll(); // Fetch all investment types
            res.render('addInvestment', { companies, investmentTypes }); // Render 'addInvestment.ejs'
        } catch (err) {
            res.status(500).send('Error rendering the form: ' + err.message);
        }
    }

    static async postCreateInvestment(req, res) {
        try {
            const { name, description, amount, CompanyId, InvestmentTypeId } = req.body;

            // Create a new investment record
            await Investment.create({
                name,
                description,
                amount,
                CompanyId,
                InvestmentTypeId,
                UserId: req.session.userId // Assuming the user is logged in and the session has userId
            });

            res.redirect('/'); // Redirect to the homepage after creating the investment
        } catch (err) {
            res.status(500).send('Error creating investment: ' + err.message);
        }
    }
}

module.exports = InvestmentController;
