function createModelResetPassword(Sequelize, DataTypes) {
  const ResetPassword = Sequelize.define(
    "ResetPassword",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      otp: DataTypes.STRING,
      id_user: {
        type: DataTypes.INTEGER,
        references: {
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
      tableName: "resetPasswords",
    }
  );
  return ResetPassword;
}

module.exports = createModelResetPassword;
