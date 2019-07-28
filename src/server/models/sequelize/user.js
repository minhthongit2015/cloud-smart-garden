module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    access_token: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {
    underscored: true
  });
  User.associate = (models) => {
    User.belongsToMany(models.Garden, { through: models.UserGarden, foreignKey: 'user_id', otherKey: 'garden_id' });
  };
  return User;
};
