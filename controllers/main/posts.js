const router = require('express').Router();
const { User, Location, Post, Comment, Reply } = require('../../models');

// Only show the 10 most featured posts
router.get('/featured', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, {model: Location}, {model: Comment}],
      order: [['up_votes', 'DESC']],
    });

    !postData ? res.status(404).json(new Error('There was an error!')) : null;

    const postsPlain = await postData.map((p) => {
      return p.get({ plain: true });
    });
    const posts = postsPlain.slice(0, 10);

    res.render('featured', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Only show the 10 most recent posts
router.get('/recent', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, {model: Location}, {model: Comment}],
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
        { model: Comment, include: [{ model: User }, 
          { model: Reply, include: [{ model: User }]}]},
      ],
    });
    // console.log(postData);
    !postData ? res.status(404).json(new Error('Failed to grab post')) : null;
    const post = postData.get({ plain: true });

    post.comments.sort((a, b) => {
      if( a.id > b.id) {
        return -1;
      }
    })

    post.comments.forEach((comment) => {
      comment.loggedIn = req.session.loggedIn;
      if (comment.user_id === req.session.userId) {
        comment.canDelete = true;
      } else {
        comment.canDelete = false;
      }
      
      comment.replies.sort((a, b) => {
        if( a.id > b.id) {
          return -1;
        }
      })

      comment.replies.forEach((reply) => {
        if(reply.user_id === req.session.userId) {
          reply.canDelete = true;
        } else {
          reply.canDelete = false;
        }
      })
    });
    

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
