function createModelBookmark(Sequelize, DataTypes) {
  const Bookmark = Sequelize.define(
    "Bookmark",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
        reference: {
          model: "recipes",
          key: "id",
        },
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        reference: {
          model: "users",
          key: "id",
        },
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
      tableName: "bookmarks",
    }
  );

  return Bookmark;
}

module.exports = createModelBookmark;
