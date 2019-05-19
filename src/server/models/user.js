module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {});
  User.associate = (models) => {
    User.belongsToMany(models.Garden, { through: models.UserGarden });
  };
  return User;
};
