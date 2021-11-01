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
  forbidIfNotLogged: (req, res, next) => {
    if (!req.session.loggedIn) {
      res.status(403).json(new Error('Not logged in!'));
      return;
    }
    next();
  },
};
