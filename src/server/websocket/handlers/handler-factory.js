

const { WS_EVENTS } = require('../../../shared/constants');
const MessageHandler = require('./message-handler');
const EnvironmentHandler = require('./environment-handler');

module.exports = class HandlerFactory {
  static get MessageHandler() {
    if (!HandlerFactory._MessageHandler) {
      HandlerFactory._MessageHandler = new MessageHandler();
    }
    return HandlerFactory._MessageHandler;
  }

  static get EnvironmentHandler() {
    if (!HandlerFactory._EnvironmentHandler) {
      HandlerFactory._EnvironmentHandler = new EnvironmentHandler();
    }
    return HandlerFactory._EnvironmentHandler;
  }

  static get(type) {
    switch (type) {
    case WS_EVENTS.message:
      return HandlerFactory.MessageHandler;
    case WS_EVENTS.environment:
      return HandlerFactory.EnvironmentHandler;
    default:
      return MessageHandler;
    }
  }
};
