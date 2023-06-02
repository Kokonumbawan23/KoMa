// function createModelRecipe(Sequelize, DataTypes) {
//   const Recipe = Sequelize.define("Recipes", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: DataTypes.STRING,
//     body: DataTypes.STRING,
//     listingredients: DataTypes.ARRAY(DataTypes.INTEGER),
//     id_type: DataTypes.INTEGER,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   }, {
//     tableName: "recipes"
//   });

//   return Recipe;
// }

// module.exports = createModelRecipe;
//const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  const Recipe = Sequelize.define(
    "recipes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      listingredients: DataTypes.ARRAY(DataTypes.INTEGER),
      id_type: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      // Other model options go here
      tableName: "recipes",
    }
  );

  return Recipe;
};
