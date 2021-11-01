const router = require('express').Router();
const { User, Location, Post, Comment } = require('../../models');
const date = new Date();

// We must be sure on the client side to .toLowerCase emails and usernames
// Or, we can go ahead and support usernames with different casing, but it will take maybe 10-15mins more work to implement

// Also, we should have two different pages for login and sign up. Login page, and "Don't have an account? Sign up here!" below the login form

router
  // Sign up
  .route('/')
  .post(async (req, res) => {
    try {
      const created = await User.create({
        creation_date: date.toDateString(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      !created ? res.status(404).json(new Error('There was an error!')) : null;

      // Save info to the cookie
      req.session.save(() => {
        req.session.loggedIn = true;
        // We haven't done .get({ plain: true }), so the id is within dataValues
        req.session.userId = created.dataValues.id;

        res.status(200).json({ message: `Created ${req.body.username}` });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .get(async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          // No need to show user ID within these
          { model: Post, attributes: { exclude: ['user_id'] } },
          { model: Comment, attributes: { exclude: ['user_id'] } },
        ],
      });

      !userData ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .put(async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        },
        {
          where: {
            // Will probably change this to req.session.userId later
            id: req.params.id,
          },
        }
      );

      !updatedUser
        ? res.status(404).json(new Error('There was an error!'))
        : null;

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  // Most likely will not end up using this route but hey it's here!
  .get(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          { model: Post, attributes: { exclude: ['user_id'] } },
          { model: Comment, attributes: { exclude: ['user_id'] } },
        ],
      });

      !user ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        // User uses username to sign in, instead of email
        username: req.body.username,
      },
    });

    // Boolean
    const valid = await userData.checkPassword(req.body.password);

    if (!userData || !valid) {
      res.status(400).json({ message: 'Wrong username/password!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.dataValues.id;

      res.status(200).json({ message: `Logged in as ${req.body.username}!` });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect('/login');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
