const User = require('./User');
const Location = require('./Location');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  // Posts of user are deleted if the user is deleted
  onDelete: 'CASCADE',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Location.hasMany(Post, {
  foreignKey: 'location_id',
});
Post.belongsTo(Location, {
  foreignKey: 'location_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  constraints: false,
  // Comments of user are deleted if user is deleted
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  // Comments of post are deleted if post is deleted
  onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Location, Post, Comment };
