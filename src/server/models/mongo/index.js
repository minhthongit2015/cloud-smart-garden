
const color = require('colors');
const db = require('./db');
const testData = require('./test');
const Debugger = require('../../services/Debugger');

async function setup() {
  await db.setup();
  Debugger.database(color.yellow('[MongoDB]'), 'Sync done!');

  await testData();
  Debugger.database(color.yellow('[MongoDB]'), 'Create test data done!');
}

module.exports = {
  ...db,
  setup
};
