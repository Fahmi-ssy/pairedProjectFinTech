function checkUser(req, res, next) {
    console.log('Session:', req.session);
    res.locals.user = req.session && req.session.user ? req.session.user : null;
    next();
  }

  function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  }
  
  module.exports = { checkUser,  ensureAuthenticated };;