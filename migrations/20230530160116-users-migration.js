'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: Sequelize.STRING,
      email : Sequelize.STRING,
      password : Sequelize.STRING,
      role: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
      height: Sequelize.INTEGER,
      weight: Sequelize.INTEGER,
      calories: Sequelize.INTEGER,
      photoProfile: Sequelize.STRING,
      phoneNumber: Sequelize.STRING,
      created_at : Sequelize.DATE,
      updated_at : Sequelize.DATE
      }
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');

  }
};
