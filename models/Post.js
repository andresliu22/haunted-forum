const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // User specified location (place within the city)
    specific_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Image embed link
    image_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [15, 10000],
      },
    },
    // When the user edits a post, this is set to true and "edited" is displayed on post
    edited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // When another user upvotes a post, this counter is increased
    // PROBLEM: We are going to need to find a way to check if a user has already upvoted a post so that they can't upvote it again and again
    // SOLVED - thanks Andres!
    // Upvotes are an array of the user IDs which have upvoted the post. We count the number with .length()
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
