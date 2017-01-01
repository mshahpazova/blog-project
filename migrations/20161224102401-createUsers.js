'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

      username: {
        type: Sequelize.STRING,
        unique: true
      },

      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
      hash: Sequelize.STRING
    });
  },

  down(queryInterface) {
    queryInterface.dropTable('Users');
  }
};
