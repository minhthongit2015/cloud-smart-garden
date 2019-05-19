module.exports = (sequelize, DataTypes) => {
  const Garden = sequelize.define('gardens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    stripe_customer_id: DataTypes.STRING
  }, {});
  Garden.associate = (models) => {
    Garden.belongsToMany(models.User, { through: models.UserGarden });
  };
  return Garden;
};
