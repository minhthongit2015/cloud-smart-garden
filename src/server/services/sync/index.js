const WebsocketManager = require('../../websocket/ws-manager');

module.exports = class {
  // sending to all clients except sender
  static broadcast(socket, event = 'message', payload) {
    socket.broadcast.emit(event, payload);
  }

  static emitToOwner(owner, event = 'message', payload) {
    WebsocketManager.clients.filter(
      client => client.handshake.session.user && client.handshake.session.user._id === owner
    ).forEach((ownerClient) => {
      ownerClient.emit(event, payload);
    });
  }

  static emit(event = 'message', payload) {
    WebsocketManager.io.emit(event, payload);
  }
};
