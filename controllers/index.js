const router = require('express').Router();
const api = require('./api');
// const main = require('./main');

router.use('/api', api);
// router.use('/', main);

router.get('/', (req, res) => {
  res.render('splash', { loggedIn: req.session.loggedIn });
});

router.get('/main', (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

module.exports = router;
