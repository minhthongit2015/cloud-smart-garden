

const colors = require('colors/safe');
const mongoose = require('mongoose');
const DebugLib = require('debug');
const { Debug } = require('../utils/constants');

const debug = DebugLib(Debug.cloud.DB);
const DBConfig = require('../config/db');

const Environment = require('./environment');

class MongoDB {
  static get db() { return MongoDB._db; }

  static async setup() {
    MongoDB._db = mongoose.connection;
    MongoDB._db.on('error', debug.bind(debug, colors.red('[MongoDB]'), 'MongoDB Error:'));
    MongoDB._db.once('open', debug.bind(debug, colors.yellow('[MongoDB]'), 'Connected to MongoDB!'));
    await mongoose.connect(DBConfig.development.dbMongoUri, { useNewUrlParser: true });
  }
}

module.exports = {
  db: MongoDB.db,
  setup: MongoDB.setup,
  Env: Environment,
  Environment
};
