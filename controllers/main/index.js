const router = require('express').Router();
const dashboard = require('./dashboard');
const posts = require('./posts');
const {
  redirectIfLogged,
  redirectIfNotLogged,
} = require('../../utils/forRoutes');
const { User, Location, Post, Comment } = require('../../models');

// USER DASHBOARD
router.use('/dashboard', dashboard);

// POST ROUTES
router.use('/posts', posts);

// Splash page
router.get('/', async (req, res) => {
  // We will need to pass the req.session.loggedIn into every single route's render
  res.render('splash', { loggedIn: req.session.loggedIn });
});

// Main page with main functionality
router.get('/main', async (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

// Load all cities
// We need a helper to sort these alphabetically
router.get('/allcities', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [
        {
          model: Post,
          attributes: ['id', 'creation_date', 'title', 'body', 'image_link'],
        },
      ],
      order: [['name', 'ASC']],
    });
    const locations = locationData.map((location) =>
      location.get({ plain: true })
    );
    res.render('allcities', { locations, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/allcities/:id', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { location_id: req.params?.id },
      include: [{ model: User }, { model: Comment }, { model: Location }],
    });

    !postsData ? res.status(404).json(new Error('Oops 404')) : null;

    const posts = await postsData.map((post) => post.get({ plain: true }));

    res.render('postsForCity', {
      loggedIn: req.session.loggedIn,
      posts,
    });
  } catch (err) {
    res.status(500).json('Oops');
  }
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
