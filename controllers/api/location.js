const router = require('express').Router();
const { User, Location, Post, Comment } = require('../../models');

// We will make this API call whenever the user makes a post under a certain location that doesn't exist already
// Location is only registered in the datebase ONCE there is at least one post under it
router.route('/').post(async (req, res) => {
  try {
    const created = await Location.create({
      name: req.body.name,
    });

    !created ? res.status(404).json(new Error('There was an error!')) : null;

    res.status(200).json(created);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
