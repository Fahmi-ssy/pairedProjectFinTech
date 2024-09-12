const { Company } = require('../models');

class Controller {
    static home(req, res) {
        // Check if user is logged in via session
        if (!req.session.userId) {
            return res.redirect('/login');
        }

        // Fetch all companies from the database
        Company.findAll()
            .then(companies => {
                // Render the 'home' view, passing in the companies and user session data
                res.render('home', { companies, user: req.session.user });
            })
            .catch(err => {
                res.send(err);
            });
    }
}

module.exports = Controller;
