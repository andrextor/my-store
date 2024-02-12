'use strict';

const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          USER_TABLE,
          'recovery_token',
          { allowNull: true, type: Sequelize.DataTypes.STRING, field: 'recovery_token' },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(USER_TABLE, 'recovery_token', { transaction: t }),
      ]);
    });
  }
};
