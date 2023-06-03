const { Ingredient, Recipe, Tag } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  handlerGetData: async (req, res, next) => {
    try {
        const arrayIdRecipe = [];
      const { ingredient } = req.query;
      console.log(ingredient);
    //   const dataIngredient = await Ingredient.findOne({
    //     where: {
    //       name: {
    //         [Op.like]: `%${ingredient}%`,
    //       },
    //     },
    //   });
    //   if (!dataIngredient) {
    //     throw new Error("Ingredient not found");
    //   }
    //   console.log("tes");
        const tag = await Tag.findAll({
          include: [
            {
              model: Ingredient,
              where: {
                name: {
                  [Op.like]: `%${ingredient}%`,
                },
              },
            },
          ],
        });
      tag.map((value) => {
        arrayIdRecipe.push(value.id_recipe);
      });

      const recipe = await Recipe.findAll({
        limit: 2,
        where: {
            id: {
                [Op.in]: arrayIdRecipe,
            }
        },
        include: [
          {
            model: Ingredient,
            as: "Ingredients",
            attributes: ["name"],
            through: {
              as: "Tags",
              attributes: [],
            },
          },
        ],
      });

      res.status(200).json({
        status: "success",
        recipe: recipe,
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
