const { Profile } = require('../models');

class ProfileController {
  static async updateProfileForm(req, res) {
    try {
      const profile = await Profile.findOne({
        where: { userId: req.session.userId } // Assuming userId is stored in session
      });

      if (!profile) {
        return res.status(404).send('Profile not found');
      }

      res.render('updateProfile', { profile }); // Render 'updateProfile.ejs' with the profile data
    } catch (err) {
      res.status(500).send('Error fetching profile: ' + err.message);
    }
  }

  static async postUpdateProfile(req, res) {
    try {
      const { name, email, address, phone } = req.body;
      
      await Profile.update({
        address,
        phone
      }, {
        where: { userId: req.session.userId } // Assuming userId is stored in session
      });

      res.redirect('/profile'); // Redirect to the profile page after update
    } catch (err) {
      res.status(500).send('Error updating profile: ' + err.message);
    }
  }
}

module.exports = ProfileController;
