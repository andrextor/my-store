'use strict';

const { USER_TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          USER_TABLE,
          'role',
          { allowNull: false, type: Sequelize.DataTypes.STRING, defaultValue: 'customer' },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(USER_TABLE, 'role', { transaction: t }),
      ]);
    }); 
  }
};
