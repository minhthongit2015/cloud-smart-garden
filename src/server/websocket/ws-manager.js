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

  static sendToClient(event, client, ...agrs) {
    const receiver = typeof client === 'object'
      ? client
      : WebsocketManager.getClientById(client.id);
    return receiver.emit(event, ...agrs);
  }

  static sendToRoom(roomId, event, ...agrs) {
    return WebsocketManager.io.to(roomId).emit(event, ...agrs);
  }

  static sendToAll(event, ...agrs) {
    return WebsocketManager.io.emit(event, ...agrs);
  }
};
