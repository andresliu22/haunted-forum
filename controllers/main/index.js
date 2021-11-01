const router = require('express').Router();
const dashboard = require('./dashboard');
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');

router.use('/dashboard', dashboard);

// Post editing/deleting
// Find the post by id. If req.session.userId is equal to the post's user_id, then render the edit page for it, otherwise redirect home - someone hacking lol

router.get('/', async (req, res) => {
  res.render('splash', { loggedIn: req.session.loggedIn });
});

router.get('/main', async (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

router.get('*', async (req, res) => {
  res.render('404', { loggedIn: req.session.loggedIn });
});

module.exports = router;
