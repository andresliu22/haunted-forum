const router = require('express').Router();
const { User, Location, Post, Comment } = require('../../models');
// If they're not even logged in, immediately throw a forbidden 403
// For tasks we don't want to even risk initializing if they're not logged in
const { forbidIfNotLogged } = require('../../utils/forRoutes');
const date = new Date();

router
  .route('/')
  .post(forbidIfNotLogged, async (req, res) => {
    try {
      const newPost = await Post.create({
        creation_date: date.toDateString(),
        specific_location: req.body.specific_location,
        image_link: req.body.image_link,
        title: req.body.title,
        body: req.body.body,
        edited: false,
        // Perhaps this can be pulled from the params/query in the url
        location_id: req.body.location_id,
        // From the cookie. Posts it for the user currently logged in
        user_id: req.session.userId,
      });
      !newPost ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  })
  .get(async (req, res) => {
    // ?location=SMTH
    try {
      const location = req.query.location;
      const locationData = await Location.findAll({
        where: {
          name: location,
        },
      });
      !location || !locationData
        ? res.status(404).json(new Error('There was an error!'))
        : null;
      const postData = await Post.findAll(
        {
          where: {
            location_id: locationData[0].dataValues.id,
          },
        },
        {
          include: [{ model: User }],
        }
      );
      const posts = await postData.map((post) => {
        return post.get({ plain: true });
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .put(forbidIfNotLogged, async (req, res) => {
    try {      
      const edited = await Post.update(
        {
          specific_location: req.body.specific_location,
          image_link: req.body.image_link,
          title: req.body.title,
          body: req.body.body,
          edited: true,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.userId,
          },
        }
      );
      
      !edited ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(edited);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(forbidIfNotLogged, async (req, res) => {
    try {
      const deleted = await Post.destroy({
        // Will only delete the post if the post ID and the user ID match - just a security measure
        where: {
          id: req.params.id,
          // Extra layer of security
          user_id: req.session.userId,
        },
      });

      !deleted ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id/comment')
  .post(forbidIfNotLogged, async (req, res) => {
    try {
      const commented = await Comment.create({
        creation_date: date.toDateString(),
        body: req.body.body,
        user_id: req.session.userId,
        post_id: req.params.id,
      });

      !commented
        ? res.status(404).json(new Error('There was an error!'))
        : null;

      res.status(200).json(commented);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  // Editing comments - THIS IS NOT COMPLETE - one of the last features to implement
  .put(forbidIfNotLogged, async (req, res) => {
    try {
      const editedComment = await Comment.update(
        {
          body: req.body.body,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(forbidIfNotLogged, async (req, res) => {
    try {
      const deleted = await Comment.destroy({
        where: {
          id: req.body.id,
          // Just a second layer of security
          // Will also only display delete buttons on that user's comments
          user_id: req.session.userId,
        },
      });

      !deleted ? res.status(404).json(new Error('There was an error!')) : null;

      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
