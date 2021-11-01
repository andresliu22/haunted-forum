const router = require('express').Router();
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');
const { User, Location, Post, Comment } = require('../../models');

// Post editing/deleting
// Find the post by id. If req.session.userId is equal to the post's user_id, then render the edit page for it, otherwise redirect home - someone hacking lol

// MAYBE to edit a post, it can be a popup instead of a whole new page! Much simpler and better user experience tbh. Not super duper hard, just a fetch request on the front end
router.get('/', redirectIfNotLogged, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post, attributes: { exclude: ['user_id'] } }],
    });

    !userData ? res.status(404).json(new Error('There was an error!')) : null;

    const user = await userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', { loggedIn: req.session.loggedIn, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
