function createModelUser(Sequelize, DataTypes) {
  const User = Sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
<<<<<<< HEAD
        allowNull: false,
=======
        allowNull: true,
>>>>>>> 9f2d8e5e81f9e7a7006c88c9c7c94f9b6af0357f
      },
      // role: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'roles',
      //     key: 'id',
      //   },
      // },
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      calories: DataTypes.INTEGER,
      photoProfile: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
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
      tableName: "users",
    }
  );

  return User;
}

module.exports = createModelUser;
