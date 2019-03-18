export default function (sequelize, DataTypes) {
  return sequelize.define('UserRoles', {
    UserRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });
}
