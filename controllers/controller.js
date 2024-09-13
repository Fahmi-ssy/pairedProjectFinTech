const { Company, User } = require('../models'); // Import User model if needed

class Controller {
    static async home(req, res) {
        try {
            // Check if user is logged in via session
            if (!req.session.userId) {
                return res.redirect('/login');
            }

            // Fetch user details if needed
            const user = await User.findByPk(req.session.userId);

            // Fetch all companies from the database
            const companies = await Company.findAll();

            // Render the 'home' view, passing in the companies and user session data
            res.render('home', { 
                companies, 
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
