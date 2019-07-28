
const colors = require('colors/safe');
const mongoose = require('mongoose');
const DebugLib = require('debug');
const { Debug } = require('../../utils/constants');
const dbConfigs = require('../../config/db');

const debug = DebugLib(Debug.cloud.DB);
const env = process.env.NODE_ENV || 'development';
const config = dbConfigs[env];

const Environment = require('./environment');
const User = require('./user');

class MongoDB {
  static get db() { return MongoDB._db; }

  static async setup() {
    mongoose.set('debug', config.dbMongoOptions.logging);
    MongoDB._db = mongoose.connection;
    MongoDB._db.on('error', debug.bind(debug, colors.red('[MongoDB]'), 'MongoDB Error:'));
    MongoDB._db.once('open', debug.bind(debug, colors.yellow('[MongoDB]'), 'Connected to MongoDB!'));
    await mongoose.connect(config.dbMongoUri, { useNewUrlParser: true });
  }
}

module.exports = {
  db: MongoDB.db,
  setup: MongoDB.setup,
  User,
  Env: Environment,
  Environment
};
