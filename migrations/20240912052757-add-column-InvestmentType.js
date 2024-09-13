'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Investments', 'InvestmentTypeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'InvestmentTypes',
        key: 'id',
      },
      onDelete: 'CASCADE', // Ensure related investments are deleted if an InvestmentType is deleted
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Investments', 'InvestmentTypeId', {});
  }
};
