/* eslint-disable no-return-assign */

const { WS_EVENTS } = require('../../../shared/constants');
const MessageHandler = require('./message-handler');
const Garden2CloudHandler = require('./garden-2-cloud-handler');
const Garden2MobileHandler = require('./garden-2-mobile-handler');
const Mobile2CloudHandler = require('./mobile-2-cloud-handler');
const Mobile2GardenHandler = require('./mobile-2-garden-handler');

module.exports = class HandlerFactory {
  static get MessageHandler() {
    return HandlerFactory._MessageHandler = HandlerFactory._MessageHandler || new MessageHandler();
  }

  static get Garden2CloudHandler() {
    return HandlerFactory._Garden2CloudHandler = HandlerFactory._Garden2CloudHandler || new Garden2CloudHandler();
  }

  static get Garden2MobileHandler() {
    return HandlerFactory._Garden2MobileHandler = HandlerFactory._Garden2MobileHandler || new Garden2MobileHandler();
  }

  static get Mobile2CloudHandler() {
    return HandlerFactory._Mobile2CloudHandler = HandlerFactory._Mobile2CloudHandler || new Mobile2CloudHandler();
  }

  static get Mobile2GardenHandler() {
    return HandlerFactory._Mobile2GardenHandler = HandlerFactory._Mobile2GardenHandler || new Mobile2GardenHandler();
  }

  static get(type) {
    switch (type) {
    case WS_EVENTS.message:
      return HandlerFactory.MessageHandler;
    case WS_EVENTS.garden2Cloud:
      return HandlerFactory.Garden2CloudHandler;
    case WS_EVENTS.garden2Mobile:
      return HandlerFactory.Garden2MobileHandler;
    case WS_EVENTS.mobile2Cloud:
      return HandlerFactory.Mobile2CloudHandler;
    case WS_EVENTS.mobile2Garden:
      return HandlerFactory.Mobile2GardenHandler;
    default:
      return null;
    }
  }
};
