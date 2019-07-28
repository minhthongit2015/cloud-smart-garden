
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const colors = require('colors/safe');
const DebugLib = require('debug');
const { Debug } = require('../../utils/constants');
const dbConfigs = require('../../config/db');

const debug = DebugLib(Debug.cloud.DB);
const env = process.env.NODE_ENV || 'development';
const config = dbConfigs[env];

class MongoDB {
  static get db() { return MongoDB._db; }

  static async setup() {
    mongoose.Promise = bluebird;
    mongoose.set('debug', config.dbMongoOptions.logging);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    MongoDB._db = mongoose.connection;
    MongoDB._db.on('error', debug.bind(debug, colors.red('[MongoDB]'), 'MongoDB Error:'));
    MongoDB._db.once('open', debug.bind(debug, colors.yellow('[MongoDB]'), 'Connected to MongoDB!'));
    await mongoose.connect(config.dbMongoUri, { useNewUrlParser: true });
  }
}

const Environment = require('./Environment');
const User = require('./User');
const Entity = require('./Entity');
const Garden = require('./Garden');
const Farm = require('./Farm');
const FoodShop = require('./FoodShop');
const ToolShop = require('./ToolShop');

module.exports = {
  db: MongoDB.db,
  setup: MongoDB.setup,
  User,
  Environment,
  Entity,
  Garden,
  Farm,
  FoodShop,
  ToolShop
};
