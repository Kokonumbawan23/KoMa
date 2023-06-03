function createAssociation(sequelize) {
  const { Bookmark, Ingredient, Recipe, ResetPassword, Tag, User, Unit } =
    sequelize.models;

  User.hasMany(ResetPassword, {
    foreignKey: "id_user",
    sourceKey: "id",
  });

  ResetPassword.belongsTo(User, {
    foreignKey: "id_user",
    targetKey: "id",
  });

  User.belongsToMany(Recipe, { through: Bookmark });
  Recipe.belongsToMany(User, { through: Bookmark });

  Recipe.belongsToMany(Ingredient, {
    through: Tag,
    as: "Ingredients",
    foreignKey: "id_recipe",
  });
  Ingredient.belongsToMany(Recipe, {
    through: Tag,
    as: "Recipes",
    foreignKey: "id_ingredient",
  });

  //   Recipe.hasMany(Tag, {
  //     foreignKey: "id_recipe",
  //     targetKey: "id",
  //   });
  //   Ingredient.hasMany(Tag, {
  //     foreignKey: "id_ingredient",
  //     targetKey: "id",
  //   });

  Tag.belongsTo(Recipe, {
    foreignKey: "id_recipe",
    sourceKey: "id",
  });

  Tag.belongsTo(Ingredient, {
    foreignKey: "id_ingredient",
    sourceKey: "id",
  });

  Unit.hasMany(Tag, {
    foreignKey: "id_unit",
    sourceKey: "id",
  });

  Tag.belongsTo(Unit, {
    foreignKey: "id_unit",
    targetKey: "id",
  });
}

module.exports = createAssociation;
