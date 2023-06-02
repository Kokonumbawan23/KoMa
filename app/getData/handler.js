const { Recipe, Ingredient , recipes} = require('../../models');

const options = {
    method: 'GET',
    url: 'https://low-carb-recipes.p.rapidapi.com/search',
    params: {
      name: 'pepper',
      limit: '10'
    },
    headers: {
      'X-RapidAPI-Key': 'adc4706ae6mshf201f695d90122dp1da984jsneafb235685af',
      'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
    }
  };

module.exports = {
    handlerGetData: async (req, res, next) => {
        try {
            const arr = [];
            const recipe = await recipes.findOne({
                where: {
                    title: "name",
                }
            });

            console.log(recipe);

            res.status(200).json({
                status:"success"
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: error.message,
            })
        }
    }
}