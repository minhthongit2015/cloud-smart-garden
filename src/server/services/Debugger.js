
const debug = require('debug');
const colors = require('colors');

const DebugConstants = {
  SERVER: 'cloud:',
  server: {
    DATABASE: 'cloud:db:'
  },
  ROUTING: 'cloud:routing:',
  API_ROUTING: 'cloud:api:',
  api: {
    USER: 'cloud:api:user:',
    GARDEN: 'cloud:api:garden:'
  },
  WEBSOCKET: 'cloud:websocket:',
  ws: {
    CORE: 'cloud:websocket:core:',
    SETUP_ROUTING: 'cloud:websocket:setup-routing:',
    ROUTING: 'cloud:websocket:routing:'
  }
};

module.exports = {
  debug,
  log: console.log.bind(console),
  colors,

  server: debug(DebugConstants.SERVER),
  database: debug(DebugConstants.server.DATABASE),
  httpRouting: debug(DebugConstants.ROUTING),

  websocket: debug(DebugConstants.WEBSOCKET),
  wsCore: debug(DebugConstants.ws.CORE),
  wsSetup: debug(DebugConstants.ws.SETUP_ROUTING),
  wsRouting: debug(DebugConstants.ws.ROUTING),

  apiRouting: debug(DebugConstants.API_ROUTING),
  apiUser: debug(DebugConstants.api.USER),
  apiGarden: debug(DebugConstants.api.GARDEN)
};
