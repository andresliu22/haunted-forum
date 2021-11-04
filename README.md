# project-2

## Table of Contents

- [Summary](#Summary)
- [Wireframe](#Wireframe)
- [Code](#Code-Snippet)
- [User-Story](#User-Story)
- [Technologies](#Technologies)
- [Authors](#Authors)
- [Acknowledgements](#Acknowledgements)

## Summary

The purpose of this site is to create a forum that users can log into and see posts organized by city detailing any local hauntings or ghost sightings that they have experienced. Users can register accounts, search cities, create posts and embed images. Users can also commont on or vote on others' posts. Posts, locations, and users are stored server-side.

## Wireframe

![Image](./assets/development/frontend_wireframe.jpg)
![Image](./assets/development/backend_wireframe.jpeg)

## Code Snippet

In order to handle an 'upvote' or 'like' system, we had to create a Vote model and an API route in order to send a request upon clicking the icon. The route finds all Votes that are attached to the post already in order to verify that the user has not already placed a vote. If not, it adds a vote to the post's up_vote attribute in order to keep track of how many votes are placed.

```Javascript
router.post('/:id/upvote', async (req, res) => {
  try {
    // console.log(req.params.id);
    const votesData = await Vote.findAll({
      where: { user_id: req.session.userId, post_id: req.params.id },
    });

    if (votesData.length > 0) {
      res.status(403).json('Cannot vote twice');
      return;
    }

    const voteCount = await sequelize.query(
      `UPDATE post SET up_votes = up_votes + 1 WHERE id=${req.params.id}`
    );
    !voteCount ? res.status(400).json('Vote failed') : null;

    const votedFor = await Vote.create({
      user_id: req.session.userId,
      post_id: req.params.id,
    });

    res.status(200).json({ votedFor, voteCount });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
```

## Steps

- Initial framework of pages
- Set up API routes
- Set up models
- Set up handlebar pages
- Page functionality
- Design/styling of pages

## User Story

- I want a search bar in order to find any ghost sightings in a city
- I want to be able to see posts from any given location
- I want to be able to sign up for a user account
- I want to be able to create a post
- I want to be able to edit a post
- I want to be able to comment on others' posts
- I want to be able to embed images into posts\
- I want to be able to reply to comments
- I want to be able to vote on posts

## Technologies Used

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [GooglePlacesAPI](https://developers.google.com/places)
- [MySQL](https://dev.mysql.com/doc/)
- [Express](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Sequelize](https://sequelize.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Authors

- **Alonzo Roman**

* [Link to Github](https://github.com/alonzofroman)
* [Link to LinkedIn](https://www.linkedin.com/)

- **Andres Liu**

* [Link to Portfolio Site](#)
* [Link to Github]()
* [Link to LinkedIn]()

- **Matt Stephens**

* [Link to Portfolio Site](https://mstephen19.github.io)
* [Link to Github](https://github.com/mstephen19)
* [Link to LinkedIn](https://www.linkedin.com/in/mstephen19/)

## Acknowledgments

- [W3Schools](https://www.w3schools.com/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
