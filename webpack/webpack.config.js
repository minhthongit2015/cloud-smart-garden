const path = require('path');
const serverConfig = require('../src/server/config');

const PUBLIC_DIR = path.resolve(__dirname, `../${serverConfig.publicFolder}`);
const CLIENT_PUBLIC_DIR = path.resolve(__dirname, '../src/client/public');
const BUILD_DIR = path.join(PUBLIC_DIR, '');

const CLIENT_DIR = path.resolve(__dirname, '../src/client');
const CLIENT_APP_DIR = path.join(CLIENT_DIR, 'app');
const CLIENT_ENTRY = path.join(CLIENT_DIR, 'client.jsx');
const STYLES_DIR = path.join(CLIENT_DIR, 'styles');

const ENTRY_FILENAME = 'client-bundle.js';
const CHUNK_FILENAME = '[name].chunk.js';
const PUBLIC_PATH = '/';

module.exports = {
  PUBLIC_DIR,
  CLIENT_PUBLIC_DIR,
  BUILD_DIR,
  CLIENT_DIR,
  CLIENT_ENTRY,
  STYLES_DIR,
  ENTRY_FILENAME,
  CHUNK_FILENAME,
  PUBLIC_PATH,
  CLIENT_APP_DIR
};
