const { Comment } = require('../models/');
const date = new Date();

const commentData = [
  {
    creation_date: date,
    body: 'Super great post! I will go there!',
    user_id: 3,
    post_id: 1,
  },
  {
    creation_date: date,
    body: 'Oh my goodness! That is so super scary',
    user_id: 2,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
