
const debug = require('debug');
const WebsocketManager = require('../websocket/ws-manager');
const { WS_EVENTS } = require('../../shared/constants');
const Logger = require('./Logger');

const serverDebug = debug('app:gardener');

module.exports = class Gardener {
  static startWorking() {
    serverDebug('Gardener Start Working');
    try {
      Gardener.test();
    } catch (error) {
      Logger.error(error);
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
