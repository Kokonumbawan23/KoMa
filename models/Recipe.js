function createModelRecipe(Sequelize, DataTypes) {
  const Recipe = Sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      calories: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      // listingredients: {
      //   type: DataTypes.ARRAY(DataTypes.JSONB),
      //   allowNull: false,
      // },
      //id_type: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "recipes",
    }
  );

  return Recipe;
}

module.exports = createModelRecipe;
//const { Sequelize, DataTypes } = require("sequelize");

// module.exports = (Sequelize, DataTypes) => {
//   const Recipe = Sequelize.define(
//     "recipes",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       title: DataTypes.STRING,
//       body: DataTypes.STRING,
//       listingredients: DataTypes.ARRAY(DataTypes.INTEGER),
//       id_type: DataTypes.INTEGER,
//       createdAt: DataTypes.DATE,
//       updatedAt: DataTypes.DATE,
//     },
//     {
//       // Other model options go here
//       tableName: "recipes",
//     }
//   );

//   return Recipe;
// };
