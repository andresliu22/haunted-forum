const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  };
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 40],
        //https://stackoverflow.com/questions/58502043/sequelize-validation-using-regular-expression
        validatePassword: function (password) {
          if (!/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,45}$/.test(password)) {
            throw new Error(
              'The password must contain 8-45 characters, including at least 1 letter and 1 number.'
            );
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      },
      beforeUpdate: async (updateUser) => {
        const salt = await bcrypt.genSalt(10);
        updateUser.password = await bcrypt.hash(updateUser.password, salt);
        return updateUser;
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

module.exports = User;
