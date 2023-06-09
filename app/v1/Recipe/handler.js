const { Recipe, Ingredient, Tag, Unit, Sequelize } = require("../../../models");
const { Op } = require("sequelize");
module.exports = {
  handlerGetDataById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const dataRecipe = await Recipe.findByPk(id, {
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
      if (!dataRecipe) {
        throw new Error("Recipe not found");
      }
      const dataJSON = dataRecipe.toJSON();
      dataJSON.listIngredients = dataJSON.Tags.map((tag) => {
        return {
          ingredient: tag.Ingredient.name,
          unit: tag.Unit.name,
          qty: tag.qty,
          desc: tag.desc,
        };
      });

      res.status(200).json({
        status: "success",
        message: "Successfully get Recipe by Id",
        data: {
          id: dataJSON.id,
          title: dataJSON.title,
          body: dataJSON.body,
          instructions: dataJSON.instructions,
          images: dataJSON.images,
          calories: dataJSON.calories,
          listIngredients: dataJSON.listIngredients,
          createdAt: dataJSON.createdAt,
          updatedAt: dataJSON.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetDataByIngredient: async (req, res, next) => {
    try {
        const { ingredient } = req.query;

        const data = await Recipe.findAll({
            include: [
                {
                    model: Ingredient,
                    as: "Ingredients",
                    attributes: [],
                    where: {
                        name: {
                            [Op.like]: `%${ingredient}%`,
                        }
                    },
                    through: {
                        model: Tag,
                        
                    }
                }
            ],
            attributes: ["id", "title", "images", "calories"],
        });

        res.status(200).json({
            status: "success",
            message: "Successfully get Recipe by Ingredient",
            data: data,
        })
    } catch (error) {
      next(error);
    }
  },

  handlerGetRandomizedData: async (req, res, next) => {
    try {

        const data = await Recipe.findAll({
            order: Sequelize.literal('random()'),
            limit: 10,
            attributes: ["id", "title", "images"],
        });

        res.status(200).json({
            status: "success",
            message: "Successfully get Recipe in Random Order",
            data: data,
        })
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
