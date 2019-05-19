
const { WS_EVENTS } = require('../../shared/constants');
const WebsocketManagerCore = require('./ws-core');
const WSHandlerFactory = require('./handlers/handler-factory');
const LoggerService = require('../services/logger');

module.exports = class WebsocketManager extends WebsocketManagerCore {
  static setup(wsServer) {
    try {
      super.setup(wsServer);
      WebsocketManager.pushHandler(WSHandlerFactory.get(WS_EVENTS.message));
      WebsocketManager.pushHandler(WSHandlerFactory.get(WS_EVENTS.garden2Cloud));
      WebsocketManager.pushHandler(WSHandlerFactory.get(WS_EVENTS.garden2Mobile));
      WebsocketManager.pushHandler(WSHandlerFactory.get(WS_EVENTS.mobile2Cloud));
      WebsocketManager.pushHandler(WSHandlerFactory.get(WS_EVENTS.mobile2Garden));
    } catch (setupError) {
      LoggerService.error({ message: setupError.message, stack: setupError.stack });
    }
  }

  static dispatchEvent(event) {
    if (event.dest) {
      const dest = typeof(event.dest) === 'object' ? event.dest : WebsocketManager.getClientById(event.dest);
      dest.emit(event.type, event.data, event.callback);
    } else {
      WebsocketManager.wsServer.emit(event.type, event.data, event.callback);
    }
  }
};
