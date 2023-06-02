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
    await queryInterface.createTable('bookmarks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_recipe: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'recipes',
          key: 'id',
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id',
        }
      },
      createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('bookmarks');
  }
};
