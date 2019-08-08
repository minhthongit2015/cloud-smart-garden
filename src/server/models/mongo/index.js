
const color = require('colors');
const DebugHelper = require('debug');
const { Debug } = require('../../utils/constants');
const db = require('./db');
const testData = require('./test');

const debug = DebugHelper(Debug.cloud.DB);

async function setup() {
  await db.setup();
  debug(color.yellow('[MongoDB]'), 'Sync done!');

  await testData();
  debug(color.yellow('[MongoDB]'), 'Create test data done!');
}

module.exports = {
  ...db,
  setup
};
