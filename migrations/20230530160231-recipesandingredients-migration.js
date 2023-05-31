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
    await queryInterface.createTable('recipesandingredients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id',
        }
      },
      ingredients: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id',
        }
      },
      amount: Sequelize.INTEGER,
      unit: {
        type: Sequelize.INTEGER,
        references: {
          model: 'units',
          key: 'id',
        }
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
    await queryInterface.dropTable('recipesandingredients');

  }
};
