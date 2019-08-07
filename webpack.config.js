const path = require('path');
const serverConfig = require('./src/server/config');

const PUBLIC_DIR = path.resolve(__dirname, `${serverConfig.publicFolder}`);
const BUILD_DIR = path.join(PUBLIC_DIR, '');

const CLIENT_DIR = path.resolve(__dirname, 'src/client');
const CLIENT_ENTRY = path.join(CLIENT_DIR, 'client.jsx');
const STYLES_DIR = path.join(CLIENT_DIR, 'styles');

const ENTRY_FILENAME = 'client-bundle.js';

module.exports = {
  PUBLIC_DIR,
  BUILD_DIR,
  CLIENT_DIR,
  CLIENT_ENTRY,
  STYLES_DIR,
  ENTRY_FILENAME
};
