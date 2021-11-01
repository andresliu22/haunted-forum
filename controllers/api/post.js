const router = require('express').Router();
const { User, Location, Post, Comment } = require('../../models');
const date = new Date();

router.route('/').post(async (req, res) => {
  try {
    const newPost = await Post.create({
      creation_date: date.toDateString(),
      specific_location: req.body.specific_location,
      image_link: req.body.image_link,
      title: req.body.title,
      body: req.body.body,
      // Perhaps this can be pulled from the params/query in the url
      location_id: req.body.location_id,
      // From the cookie. Posts it for the user currently logged in
      user_id: req.session.userId,
    });

    !newPost ? res.status(404).json(new Error('There was an error!')) : null;

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  // Find the post by id. If req.session.userId is equal to the post's user_id, then delete/update it, otherwise error - someone hacking lol
});

module.exports = router;
