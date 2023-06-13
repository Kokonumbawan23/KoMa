
const axios = require('axios');

const { Recipe, Ingredient, Tag, Unit } = require("../../models");
require('dotenv').config({path: __dirname+ '/../../.env'});

const url = "https://low-carb-recipes.p.rapidapi.com";



const options = {
  method: 'GET',

  headers: {
    "X-RapidAPI-Key": process.env.APIKEY,
    'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
  }
};


module.exports = {
  handlerGetData: async (req, res, next) => {
    try {
      const arr = [];

      const { tags, ingredient } = req.body;
      const names = tags ? `name=${tags}` : "";
      const include = ingredient
        ? `&includeIngredients=${ingredient}`
        : "&includeIngredients=banana";
      const getData = await axios(
        `${url}/search?${names}${include}&limit=3&tags=pork-free&excludeIngredients=Bacon`,
        options
      );

      
      const json = await getData.data;
      if(json.message) {
        throw new Error(json.message);
      }
      const dataMap = json.map(async (element) => {
        const checkRecipe = await Recipe.findOne({
          where: {
            title: element.name,
          },
        });
        if (checkRecipe) {
          return;
        }
        const newDescription = element.description.replace(/#/g,'');
        //const bufferImage = await downloadImage(element.image);    
        // const response = await fetch(element.image);
        // const bufferImage = await response.buffer();
        // const uploadedtoGCS = await pushSingleImageToStorage(bufferImage);
        
        
        


        const recipe = await Recipe.create({
          title: element.name,
          body: newDescription,
          instructions: element.steps[0],
          images: [element.image],
          calories: element.nutrients.caloriesKCal
        });
       


        console.log("RECIPE IN");
        element.ingredients.map(async (ingredient) => {
          console.log(`Bahan: ${ingredient.name}`);
          const [checkIngredient, created] = await Ingredient.findOrCreate({
            where: {
              name: ingredient.name,
            },
            defaults: {
              name: ingredient.name,
            },
          });
          const [checkUnit, create] = await Unit.findOrCreate({
            where: {
              name: ingredient.servingSize.units,
            },
            defaults: {
              name: ingredient.servingSize.units,
            },
          });

          arr.push(checkIngredient.id);

          await Tag.create({
            id_recipe: recipe.id,
            id_ingredient: checkIngredient.id,
            id_unit: checkUnit.id,
            desc: ingredient.servingSize.desc || ingredient.servingSize.units,
            qty: ingredient.servingSize.qty,
          });

        });

        console.log("INGREDIENT IN");

        return element;
      });

      res.status(201).json({
        status: "success",
        ingredients: dataMap,
        //tag: arrayTag,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
