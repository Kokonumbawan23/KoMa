'use strict';

const axios = require('axios');
const {Ingredient} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const options = {
      method: 'GET',
      url: 'https://low-carb-recipes.p.rapidapi.com/search',
      params: {
        Includeingredients: 'Soy-beans',
        limit: '15'
      },
      headers: {
        'X-RapidAPI-Key': 'adc4706ae6mshf201f695d90122dp1da984jsneafb235685af',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      const data = response.data;
      console.log(data.length);
      
      for(let i = 0; i < data.length; i++){
        const ingredients = data[i].ingredients;
        for(let j = 0; j < ingredients.length; j++){
          let name = ingredients[j].name
          if(await Ingredient.findOne({
            where: {
              name,
            }
          }) === null){
            console.log(name);
            await queryInterface.bulkInsert('ingredients',
            [{
              name,
              createdAt: new Date,
              updatedAt: new Date
            }]);
          }
        }
      }
     
    } catch (error) {
      console.error(error);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
