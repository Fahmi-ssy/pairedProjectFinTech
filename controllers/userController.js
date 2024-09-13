const { User } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {

  static loginForm(req, res) {
    const { error } = req.query;
    res.render('auth-page/login-form', { error });
  }

  static registerForm(req, res) {
    res.render('auth-page/register-form');
  }

  static async postRegisterForm(req, res) {
    const { name, email, password, role } = req.body;
    try {
      await User.create({ name, email, password, role });
      res.redirect('/login');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => ({ msg: err.message }));
        res.render('auth-page/register-form', {
          errors,
          oldValues: { name, email, role }
        });
      } else {
        res.send(error);
      }
    }
  }

  static async login(req, res) {
    try {
        let { error } = req.query;
        res.render('login', { error })
    } catch (error) {
        res.send(error.message);
    }
}
  static async postLogin(req, res) {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ where: { name } });
        if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (isValidPassword) {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    profilePhoto: user.profilePhoto || 'default-avatar.png' // Default photo if not set
                };
                req.session.save(err => {
                    if (err) {
                        console.error('Session save error:', err);
                    }
                    res.redirect('/');
                });
                req.session.userId = user.id;
            } else {
                const error = 'Invalid password';
                res.redirect(`/login?error=${error}`);
            }
        } else {
            const error = 'User not found';
            res.redirect(`/login?error=${error}`);
        }
    } catch (err) {
        res.send(err.message);
    }
}

  
  

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.send('Error in logging out');
      }
      res.redirect('/');
    });
  }

}

module.exports = UserController;
