const router = require('express').Router();
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');

// Post editing/deleting
// Find the post by id. If req.session.userId is equal to the post's user_id, then render the edit page for it, otherwise redirect home - someone hacking lol

module.exports = router;
