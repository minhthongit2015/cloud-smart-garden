
const DebugLib = require('debug');
const color = require('colors');
const { Debug } = require('../../utils/constants');
const db = require('./db');
const testData = require('./test');

const debug = DebugLib(Debug.cloud.DB);

db.sequelize.sync({ alter: true })
  .then(() => {
    debug(color.yellow('[PosgreDB]'), 'Sync done!');
  })
  .then(async () => {
    await testData();
    debug(color.yellow('[PosgreDB]'), 'Create test data done!');
  });

module.exports = db;
