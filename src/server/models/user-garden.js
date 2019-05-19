module.exports = (sequelize, DataTypes) => {
  const UserGarden = sequelize.define('user_gardens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true
  });
  UserGarden.associate = (models) => {
    UserGarden.belongsTo(models.User, { foreignKey: 'user_id' });
    UserGarden.belongsTo(models.Garden, { foreignKey: 'garden_id' });
  };
  return UserGarden;
};
