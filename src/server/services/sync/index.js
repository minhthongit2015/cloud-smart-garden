const WebsocketManager = require('../../websocket/ws-manager');

module.exports = class {
  static emit(event = 'message', payload) {
    WebsocketManager.io.emit(event, payload);
  }
};
