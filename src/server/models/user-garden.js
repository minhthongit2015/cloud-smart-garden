module.exports = (sequelize, DataTypes) => {
  const UserGarden = sequelize.define('user_garden', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {});
  UserGarden.associate = (models) => {
    //
  };
  return UserGarden;
};
