
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const colors = require('colors/safe');
const dbConfigs = require('../../config/db');
const Debugger = require('../../services/Debugger');

const env = process.env.NODE_ENV || 'development';
const config = dbConfigs[env];

class MongoDB {
  static RETRY_INTERVAL = 5000;

  static get db() { return mongoose.connection; }

  static async setup() {
    mongoose.Promise = bluebird;
    mongoose.set('debug', config.dbMongoOptions.logging);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    await MongoDB.connect();
  }

  static async connect() {
    await mongoose.connect(config.dbMongoUri, { useNewUrlParser: true })
      .then(() => {
        Debugger.database(`${colors.yellow('[MongoDB]')} Connected to the MongoDB database!`);
      })
      .catch((...args) => {
        Debugger.database(`${colors.red('<!>')} ${colors.yellow('[MongoDB]')} Cannot connect to the MongoDB Database!`);
      });
    if (this.db && this.db.readyState === 1) {
      return true;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, this.RETRY_INTERVAL);
    });
    return this.connect();
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
