const Sequelize = require('sequelize');
const dbConfigs = require('../config/db');
const User = require('./user');
const Garden = require('./garden');
const UserGarden = require('./user-garden');


const env = process.env.NODE_ENV || 'development';
const config = dbConfigs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config.dbPostgresOptions);
} else {
  sequelize = new Sequelize(config.dbPostgresURI, config.dbPostgresOptions);
}

db.User = User(sequelize, Sequelize);
db.Garden = Garden(sequelize, Sequelize);
db.UserGarden = UserGarden(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({
  alter: true
});

module.exports = db;
