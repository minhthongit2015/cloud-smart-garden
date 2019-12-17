
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

const LINE_LENGTH = 80;
function txtLen(text = '') {
  const trueText = Object.values(colors.styles)
    .reduce((txt, color) => {
      const regOpen = new RegExp(`${color.open.replace('[', '\\[')}`, 'g');
      const regClose = new RegExp(`${color.close.replace('[', '\\[')}`, 'g');
      return txt.replace(regOpen, '').replace(regClose, '');
    }, text)
    .replace(/\r|\n/g, '');
  return trueText.length;
}

module.exports = {
  debug,
  log: console.log.bind(console),
  center: (text) => {
    console.log(''.padStart((LINE_LENGTH - txtLen(text)) / 2, ' ') + text);
  },
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
