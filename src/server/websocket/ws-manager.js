const WebsocketManagerCore = require('./ws-core');
const Debugger = require('../services/Debugger');
const Logger = require('../services/Logger');

module.exports = class WebsocketManager extends WebsocketManagerCore {
  static setup(wsServer) {
    Debugger.websocket('<*> Setup Websocket Manager');
    try {
      super.setup(wsServer);
    } catch (setupError) {
      Logger.error({ message: setupError.message, stack: setupError.stack });
    }
  }
};
