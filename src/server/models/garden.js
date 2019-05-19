module.exports = (sequelize, DataTypes) => {
  const Garden = sequelize.define('gardens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    local_ip: DataTypes.STRING,
    location: DataTypes.STRING,
    physical_address: DataTypes.STRING
  }, {
    underscored: true
  });
  Garden.associate = (models) => {
    Garden.belongsToMany(models.User, { through: models.UserGarden, foreignKey: 'garden_id', otherKey: 'user_id' });
  };
  return Garden;
};
