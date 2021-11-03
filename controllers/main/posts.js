const router = require('express').Router();
const { User, Location, Post, Comment } = require('../../models');

// Only show the 10 most recent posts
router.get('/recent', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, {model: Location}],
      order: [['id', 'DESC']],
    });

    !postData ? res.status(404).json(new Error('There was an error!')) : null;

    const postsPlain = await postData.map((p) => {
      return p.get({ plain: true });
    });
    const posts = postsPlain.slice(0, 10);

    res.render('mostrecent', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User }, {model: Location}, 
        { model: Comment, include: [{ model: User }] },
      ],
    });
    // console.log(postData);
    !postData ? res.status(404).json(new Error('Failed to grab post')) : null;
    const post = postData.get({ plain: true });
    post.comments.forEach((comment) => {
      if (comment.user_id === req.session.userId) {
        comment.canDelete = true;
      } else {
        comment.canDelete = false;
      }
      console.log(post);
    });
    console.log(req.session.userId);
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
