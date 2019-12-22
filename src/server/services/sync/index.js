const WebsocketManager = require('../../websocket/ws-manager');

module.exports = class {
  // sending to all clients except sender
  static broadcast(socket, event = 'message', payload) {
    socket.broadcast.emit(event, payload);
  }

  static emit(event = 'message', payload) {
    WebsocketManager.io.emit(event, payload);
  }
};
