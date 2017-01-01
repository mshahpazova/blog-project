'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('Posts', {
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

      title: Sequelize.STRING,
      text: Sequelize.TEXT,

      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Posts');
  }
};
