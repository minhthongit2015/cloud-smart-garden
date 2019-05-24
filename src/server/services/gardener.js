
const debug = require('debug');
const WebsocketManager = require('../websocket');
const WebsocketEvent = require('../websocket/event');
const { WS_EVENTS } = require('../../shared/constants');
const LoggerService = require('../services/logger');

const serverDebug = debug('app:gardener');

module.exports = class Gardener {
  static startWorking() {
    serverDebug('Gardener Start Working');
    try {
      Gardener.test();
    } catch (error) {
      LoggerService.error(error);
    }
  }

  static dispatchCommand(command, dest) {
    const commandEvent = new WebsocketEvent(WS_EVENTS.command, command, dest);
    WebsocketManager.dispatchEvent(commandEvent);
  }

  static test() {
    // setInterval(() => {
    //   const first = WebsocketManager.clientArray[0];
    //   Gardener.dispatchCommand({
    //     targetType: 'station',
    //     targetId: 'A1-01',
    //     pump: Math.random() > 0.5,
    //     led: Math.random() > 0.5,
    //     fan: Math.random() > 0.5,
    //     misting: Math.random() > 0.5
    //   }, first);
    // }, 5000);
  }

};
