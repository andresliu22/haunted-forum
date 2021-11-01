const User = require('./User');
const Location = require('./Location');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
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
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Location, Post, Comment };
