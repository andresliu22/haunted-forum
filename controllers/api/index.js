const router = require('express').Router();
const location = require('./location');
const post = require('./post');
const user = require('./user');

router.use('/locations', location);
router.use('/posts', post);
router.use('/users', user);

module.exports = router;
