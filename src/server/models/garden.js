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
    position: DataTypes.STRING, // latlng
    address: DataTypes.STRING, // 31 street..
    local_ip: DataTypes.STRING,
    physical_address: DataTypes.STRING
  }, {
    underscored: true
  });
  Garden.associate = (models) => {
    Garden.belongsToMany(models.User, { through: models.UserGarden, foreignKey: 'garden_id', otherKey: 'user_id' });
  };
  return Garden;
};
