
const DebugHelper = require('debug');
const color = require('colors');
const { Debug } = require('../../utils/constants');
const db = require('./db');
const testData = require('./test');

const debug = DebugHelper(Debug.cloud.DB);

db.setup = async enabled => enabled && db.sequelize.sync({ alter: true })
  .then(() => {
    debug(color.yellow('[PosgreDB]'), 'Sync done!');
  })
  .then(async () => {
    await testData();
    debug(color.yellow('[PosgreDB]'), 'Create test data done!');
  });


module.exports = db;
