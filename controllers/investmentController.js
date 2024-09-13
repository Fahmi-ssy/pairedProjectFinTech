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

    static async editInvestmentForm(req, res) {
        try {
            const { id } = req.params;
    
            // Fetch the investment by ID along with related company and investment type
            const investment = await Investment.findByPk(id, {
                include: [Company, InvestmentType]
            });
    
            if (!investment) {
                return res.status(404).send('Investment not found');
            }
    
            // Fetch all companies and investment types
            const companies = await Company.findAll();
            const investmentTypes = await InvestmentType.findAll();
    
            // Render the edit form with investment data, companies, and investment types
            res.render('editInvestment', { 
                investment, 
                companies, 
                investmentTypes 
            });
        } catch (err) {
            res.status(500).send('Error rendering the form: ' + err.message);
        }
    }

    static async postEditInvestment(req, res) {
        try {
            const { id } = req.params;
            const { name, description, amount, CompanyId, InvestmentTypeId } = req.body;

            await Investment.update({
                name,
                description,
                amount,
                CompanyId,
                InvestmentTypeId
            }, {
                where: { id }
            });

            res.redirect('/'); // Redirect to the homepage after updating the investment
        } catch (err) {
            res.status(500).send('Error updating investment: ' + err.message);
        }
    }

    static async deleteInvestment(req, res) {
        try {
            const { id } = req.params;

            await Investment.destroy({ where: { id } });

            res.redirect('/'); // Redirect to the homepage after deleting the investment
        } catch (err) {
            res.status(500).send('Error deleting investment: ' + err.message);
        }
    }
}

module.exports = InvestmentController;
