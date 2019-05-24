

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const mongoose = require('mongoose');
const DBConfig = require('../../config/db');

const Environment = require('./environment');

class MongoDB {
  static get db() { return MongoDB._db; }

  static async setup() {
    MongoDB._db = mongoose.connection;
    MongoDB._db.on('error', debug.bind(debug, colors.red('[MongoDB]'), 'MongoDB Error:'));
    MongoDB._db.once('open', debug.bind(debug, colors.yellow('[MongoDB]'), 'Connected to MongoDB!'));
    await mongoose.connect(DBConfig.development.dbMongoUri, { useNewUrlParser: true });
  }
};

module.exports = {
  setup: MongoDB.setup,
  Env: Environment,
  Environment
};