function createModelTag(Sequelize, DataTypes) {
  const Tag = Sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipe",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      id_ingredient: {
        type: DataTypes.INTEGER,
        references: {
          model: "ingredient",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      id_unit: {
        type: DataTypes.INTEGER,
        references: {
          model: "unit",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
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
      tableName: "tags",
    }
  );

  return Tag;
}

module.exports = createModelTag;
