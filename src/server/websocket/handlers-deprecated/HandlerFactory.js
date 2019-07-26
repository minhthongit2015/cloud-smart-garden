/* @flow */
/* eslint-disable no-return-assign */

const { WS_EVENTS } = require('../../../shared/constants');
const MessageHandler = require('./MessageHandler');

const GardenConnectHander = require('./garden/GardenConnectHandler');
const Garden2CloudHandler = require('./garden/Garden2CloudHandler');
const Garden2MobileHandler = require('./garden/Garden2MobileHandler');
const EnvironmentHandler = require('./garden/EnvironmentHandler');

const MobileConnectHandler = require('./mobile/MobileConnectHandler');
const Mobile2CloudHandler = require('./mobile/Mobile2CloudHandler');
const Mobile2GardenHandler = require('./mobile/Mobile2GardenHandler');

module.exports = class HandlerFactory {
  static get(type) {
    switch (type) {
    case WS_EVENTS.message: return new MessageHandler();
    case WS_EVENTS.gardenConnect: return new GardenConnectHander();
    case WS_EVENTS.garden2Cloud: return new Garden2CloudHandler();
    case WS_EVENTS.garden2Mobile: return new Garden2MobileHandler();
    case WS_EVENTS.environment: return new MobileConnectHandler();
    case WS_EVENTS.mobileConnect: return new Mobile2CloudHandler();
    case WS_EVENTS.mobile2Cloud: return new Mobile2GardenHandler();
    case WS_EVENTS.mobile2Garden: return new EnvironmentHandler();
    default: return null;
    }
  }
};
