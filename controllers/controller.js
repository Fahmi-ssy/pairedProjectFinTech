const { Company, User, Investment, InvestmentType } = require('../models');

class Controller {
    static async home(req, res) {
        try {
            
            if (!req.session.userId) {
                return res.redirect('/login');
            }

           
            const user = await User.findByPk(req.session.userId);

            
            const companies = await Company.findAll();

            
            const investments = await Investment.findAll({
                where: { UserId: req.session.userId },  // Filter investments by logged-in user
                include: [Company, InvestmentType]  // Include related company and investment type
            });

            
            res.render('home', { 
                companies, 
                investments,  
                user: user ? {
                    id: user.id,
                    name: user.name,
                    profilePhoto: user.profilePhoto || 'default-avatar.png' // Provide a default photo if none
                } : null 
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = Controller;
