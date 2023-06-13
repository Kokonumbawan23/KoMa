const { Ingredient, Recipe, Tag, Unit } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  handlerGetData: async (req, res, next) => {
    try {
      const arrayIdRecipe = [];
      const { ingredient } = req.query;
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

      //   const recipe = await Recipe.findAll({
      //     limit: 2,
      //     where: {
      //       id: {
      //         [Op.in]: arrayIdRecipe,
      //       },
      //     },
      //     include: [
      //       {
      //         model: Ingredient,
      //         as: "Ingredients",
      //         attributes: ["name"],

      //         through: {
      //           model: Tag,
      //           as: "Size",
      //           attributes: ["desc", "qty"],
      //           //   through: {
      //           //     model: Unit,
      //           //     as: "Units",
      //           //     attributes: ["name"],
      //           //   },
      //         },
      //         include: [{
      //             model: Unit,
      //             as: "Unit",
      //             attributes: ["name"],
      //             through: {
      //                 attributes: []
      //             },

      //         }]

      //       },
      //     //   {
      //     //     model: Unit,
      //     //     as: "Unit",
      //     //     attributes: ["name"],
      //     //     through: {},
      //     //   },
      //     ],
      //   });

      const recipe = await Recipe.findAll({
        limit: 2,
        where: {
          id: {
            [Op.in]: arrayIdRecipe,
          },
        },
        include: [
          {
            model: Tag,
            attributes: ["qty", "desc"],
            include: [
              {
                model: Ingredient,
                attributes: ["name"],
              },
              {
                model: Unit,
                attributes: ["name"],
              },
            ],
          },
        ],
      });

    //   const dataJson = recipe.map((value) => {
    //     return value.toJSON();
    //   });

      const dataResult = recipe.map((value) => {
        value.Tags = value.Tags.map((tag) => {
          
          return {
            ingredient: tag.Ingredient.name,
            unit: tag.Unit.name,
            qty: tag.qty,
            desc: tag.desc,
            
          };
        });
        console.log(value.images);
        return {
            id:value.id,
            title:value.title,
            body:value.body,
            instructions:value.instructions,
            listIngredients: value.Tags,
            images: value.images,
            createdAt: value.createdAt,
            updatedAt:value.updatedAt,
        };
      });
      res.status(200).json({
        status: "success",
        recipe: dataResult,
      });
    } catch (error) {
      next(error);
    }
  },
};
