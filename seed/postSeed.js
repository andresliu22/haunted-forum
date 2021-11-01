const { Post } = require('../models/');
const date = new Date();

const postData = [
  {
    creation_date: date.toDateString(),
    specific_location: 'Under the bridge',
    image_link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*',
    title: 'Super scary cat!!!',
    body: 'I saw a cat on the road! Super super duper super duper super scary!',
    edited: false,
    location_id: 1,
    user_id: 2,
  },
  {
    creation_date: date.toDateString(),
    specific_location: 'In my house',
    image_link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*',
    title: 'Help! My mom!',
    body: 'My mom grounded me from my PS2 and now I am angry >:( please call the police immediately',
    edited: false,
    location_id: 2,
    user_id: 1,
  },
  {
    creation_date: date.toDateString(),
    specific_location: 'Abandoned house by the church',
    image_link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*',
    title: 'I saw a ghost in there...',
    body: 'I spotted some sort of weird ghost-like creature next to the old abandoned house when I was at church with my nan on Sunday.',
    edited: false,
    location_id: 3,
    user_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
