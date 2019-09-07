const WebsocketManager = require('../../websocket/ws-manager');

module.exports = class {
  static emit(event, payload) {
    WebsocketManager.io.emit(event, payload);
  }
};
