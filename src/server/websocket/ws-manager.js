/* @flow */
const { WS_EVENTS } = require('../../shared/constants');
const WebsocketManagerCore = require('./ws-core');
const WSHandlerFactory = require('./handlers/HandlerFactory');
const Logger = require('../services/Logger');

module.exports = class WebsocketManager extends WebsocketManagerCore {
  static setup(wsServer) {
    try {
      super.setup(wsServer);
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.message));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.gardenConnect));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.garden2Cloud));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.garden2Mobile));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.environment));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.mobileConnect));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.mobile2Cloud));
      WebsocketManager.registerHandler(WSHandlerFactory.get(WS_EVENTS.mobile2Garden));
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
