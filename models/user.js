'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i']
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i']
      }
    },

    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },

    // hashed password
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Post, {
          as: 'posts',
          foreignKey: 'authorId'
        });

        User.hasMany(models.Comment, {
          as: 'comments',
          foreignKey: 'authorId'
        });
      }
    }
  });

  return User;
};
