
const WebsocketManager = require('../websocket');
const WSEvent = require('../websocket/event');

module.exports = class {
  static async resolveStationEnvironmentData(environment) {
    const environmentEvent = new WSEvent('environment', environment);
    WebsocketManager.dispatchEvent(environmentEvent);
  }
};