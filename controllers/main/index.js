const router = require('express').Router();
const dashboard = require('./dashboard');
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');

// USER DASHBOARD
router.use('/dashboard', dashboard);

// Splash page
router.get('/', async (req, res) => {
  // We will need to pass the req.session.loggedIn into every single route's render
  res.render('splash', { loggedIn: req.session.loggedIn });
});

// Main page with main functionality
router.get('/main', async (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

// We will have separate /login and /signup pages. "Don't have an account? on /login Will bring us to the /signup route"
// Our login and signup forms will not be on the same page
router.get('/login', redirectIfLogged, async (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn });
});
router.get('/signup', redirectIfLogged, async (req, res) => {
  res.render('signup', { loggedIn: req.session.loggedIn });
});

// Wildcard
router.get('*', async (req, res) => {
  res.render('404', { loggedIn: req.session.loggedIn });
});

module.exports = router;
