'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },

    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate(models) {

        Post.hasMany(models.Comment, {
          foreignKey: 'postId',
          as: 'comments',
          onDelete: 'cascade'
        });

        Post.belongsTo(models.User, {
          foreignKey: 'authorId',
          as: 'author'
        });
      }
    }
  });

  return Post;
};
