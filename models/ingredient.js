const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const Ingredient = Sequelize.define('Ingredient', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    // Other model options go here
    tableName: 'ingredients'
  });

  return Ingredient;
}

