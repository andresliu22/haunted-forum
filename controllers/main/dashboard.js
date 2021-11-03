const router = require('express').Router();
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');
const { User, Location, Post, Comment } = require('../../models');
const date = new Date();
// Post editing/deleting
// Find the post by id. If req.session.userId is equal to the post's user_id, then render the edit page for it, otherwise redirect home - someone hacking lol

// MAYBE to edit a post, it can be a popup instead of a whole new page! Much simpler and better user experience tbh. Not super duper hard, just a fetch request on the front end
router.get('/', redirectIfNotLogged, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post, attributes: { exclude: ['user_id'] }, include: [{model: Comment}] } ],
    });

    !userData ? res.status(404).json(new Error('There was an error!')) : null;
  
    const user = await userData.get({ plain: true });
    console.log(user);

    const daysCreated = parseInt((date - user.creation_date) / (1000 * 60 * 60 * 24));
    let createdToday = false
    daysCreated == 0 ? createdToday = true : createdToday = false;
    res.render('dashboard', { loggedIn: req.session.loggedIn, user, daysCreated: daysCreated, createdToday: createdToday });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
