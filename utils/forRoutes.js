// Custom middleware to redirect based on login (to use in main routes)
module.exports = {
  redirectIfLogged: (req, res, next) => {
    if (req.session.loggedIn) {
      res.redirect('/');
    } else {
      next();
    }
  },
  redirectIfNotLogged: (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/');
    } else {
      next();
    }
  },
};
