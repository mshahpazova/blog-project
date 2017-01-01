'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Comment.hasMany(models.Comment, {
          foreignKey: 'parentId',
          as: 'replies',
          onDelete: 'cascade'
        });

        Comment.belongsTo(models.Comment, {
          foreignKey: 'parentId',
          as: 'parent'
        });

        Comment.belongsTo(models.User, {
          foreignKey: 'authorId',
          as: 'author'
        });

        Comment.belongsTo(models.Post, {
          foreignKey: 'postId',
          as: 'post'
        });
      }
    }
  });

  return Comment;
};
