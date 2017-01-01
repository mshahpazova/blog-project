'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('Comments', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      createdAt: {
        type: Sequelize.DATE
      },

      updatedAt: {
        type: Sequelize.DATE
      },

      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },

      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: 'cascade'
      },

      parentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Comments');
  }
};
