
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const colors = require('colors/safe');
const dbConfigs = require('../../config/db');
const Debugger = require('../../services/Debugger');

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
    MongoDB._db.on('error', Debugger.database.bind(Debugger.database, colors.red('[MongoDB]'), 'MongoDB Error:'));
    MongoDB._db.once('open', Debugger.database.bind(Debugger.database, colors.yellow('[MongoDB]'), 'Connected to MongoDB!'));
    await mongoose.connect(config.dbMongoUri, { useNewUrlParser: true });
  }
}

const User = require('./user/User');

const BlogBase = require('./blog-base');
const Blog = require('./blog');
const MapModels = require('./map');
const Garden = require('./garden');
const AI = require('./AI');
const Company = require('./intranet');

module.exports = {
  db: MongoDB.db,
  setup: MongoDB.setup,

  User,
  ...BlogBase,
  ...Blog,
  ...MapModels,
  ...Garden,
  ...AI,
  ...Company
};
