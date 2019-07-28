module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define('user_tokens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: DataTypes.STRING
  }, {
    underscored: true
  });
  UserToken.associate = (models) => {
    UserToken.belongsTo(models.User);
  };
  return UserToken;
};
