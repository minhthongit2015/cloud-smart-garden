/* eslint-disable no-return-assign */

const { WS_EVENTS } = require('../../../shared/constants');
const MessageHandler = require('./message-handler');

const GardenConnectHander = require('./garden-connect-handler');
const Garden2CloudHandler = require('./garden-2-cloud-handler');
const Garden2MobileHandler = require('./garden-2-mobile-handler');
const EnvironmentHandler = require('./environment-handler');

const MobileConnectHandler = require('./mobile-connect-handler');
const Mobile2CloudHandler = require('./mobile-2-cloud-handler');
const Mobile2GardenHandler = require('./mobile-2-garden-handler');

const StaticHandlers = {
  MessageHandler: new MessageHandler(),
  GardenConnectHander: new GardenConnectHander(),
  Garden2CloudHandler: new Garden2CloudHandler(),
  Garden2MobileHandler: new Garden2MobileHandler(),
  MobileConnectHandler: new MobileConnectHandler(),
  Mobile2CloudHandler: new Mobile2CloudHandler(),
  Mobile2GardenHandler: new Mobile2GardenHandler(),
  EnvironmentHandler: new EnvironmentHandler()
};

module.exports = class HandlerFactory {
  static get(type) {
    switch (type) {
    case WS_EVENTS.message: return StaticHandlers.MessageHandler;
    case WS_EVENTS.gardenConnect: return StaticHandlers.GardenConnectHander;
    case WS_EVENTS.garden2Cloud: return StaticHandlers.Garden2CloudHandler;
    case WS_EVENTS.garden2Mobile: return StaticHandlers.Garden2MobileHandler;
    case WS_EVENTS.environment: return StaticHandlers.EnvironmentHandler;
    case WS_EVENTS.mobileConnect: return StaticHandlers.MobileConnectHandler;
    case WS_EVENTS.mobile2Cloud: return StaticHandlers.Mobile2CloudHandler;
    case WS_EVENTS.mobile2Garden: return StaticHandlers.Mobile2GardenHandler;
    default: return null;
    }
  }
};