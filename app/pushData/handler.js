const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

  

const http = require("https");
const { pipeline } = require('node:stream/promises');
const axios = require('axios');
// const uploadImage = require("../../utils/multer");
// const { pushSingleImageToStorage } = require("../../utils/uploadToGCS");
const { Recipe, Ingredient, Tag, Unit } = require("../../models");
const ingredient = require("../../models/ingredient");
const url = "https://low-carb-recipes.p.rapidapi.com";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.APIKEY,
    "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
  },
};

// const options = {
//     method: 'GET',
//     url: 'https://low-carb-recipes.p.rapidapi.com/search',
//     params: {
//       name: 'pepper',
//       limit: '10'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'adc4706ae6mshf201f695d90122dp1da984jsneafb235685af',
//       'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
//     }
//   };
// async function downloadImage(url) {
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   return Buffer.from(response.data, 'binary');
// }

module.exports = {
  handlerGetData: async (req, res, next) => {
    try {
      const arr = [];

      const { tags, ingredient } = req.body;
      const names = tags ? `name=${tags}` : "";
      const include = ingredient
        ? `&includeIngredients=${ingredient}`
        : "&includeIngredients=banana";
      const getData = await fetch(
        `${url}/search?${names}${include}&limit=3&tags=pork-free&excludeIngredients=Bacon`,
        options
      );
      const json = await getData.json();
      const dataMap = json.map(async (element) => {
        const checkRecipe = await Recipe.findOne({
          where: {
            title: element.name,
          },
        });
        if (checkRecipe) {
          return;
        }

        // const bufferImage = await downloadImage(element.image);    

        // const uploadedtoGCS = await pushSingleImageToStorage(bufferImage);
        // console.log("Upload: " +uploadedtoGCS);
        // const imageArr = [uploadedtoGCS];
        // console.log(element.image);


        const recipe = await Recipe.create({
          title: element.name,
          body: element.description,
          instructions: element.steps[0],
          images: [element.image],
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
          // console.log(ingredient.servingSize);
          arr.push(checkIngredient.id);

          await Tag.create({
            id_recipe: recipe.id,
            id_ingredient: checkIngredient.id,
            id_unit: checkUnit.id,
            desc: ingredient.servingSize.desc || ingredient.servingSize.units,
            qty: ingredient.servingSize.qty,
          });
          // console.log(checkIngredient);
        });

        console.log("INGREDIENT IN");

        // arr.forEach(async (value) => {
        //   console.log(`array value: ${value}`);
        //   const tagIn = await Tag.create({
        //     recipe: recipe.id,
        //     ingredients: value,
        //   });
        //   arrayTag.push(tagIn);
        // });
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
