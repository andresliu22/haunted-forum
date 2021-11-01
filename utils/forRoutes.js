// Custom middleware to redirect based on login (to use in main routes)
module.exports = {
  // If logged in, send back to the main page
  redirectIfLogged: (req, res, next) => {
    if (req.session.loggedIn) {
      res.redirect('/main');
    } else {
      next();
    }
  },
  // If not logged in, send to the login page
  redirectIfNotLogged: (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  forbidIfNotLogged: (req, res, next) => {
    if (!req.session.loggedIn) {
      res.status(403).json(new Error('Not logged in!'));
      return;
    }
    next();
  },
};
