const WebsocketManager = require('../../websocket/ws-manager');


module.exports = class {
  static get manager() {
    return WebsocketManager;
  }

  static get io() {
    return this.manager.io;
  }

  static socket(req) {
    return req.socket && this.manager.getClientById(req.socket.id);
  }

  static getListTargets(targets = [''] || '') {
    if (!Array.isArray(targets)) {
      targets = [targets];
    }
    return targets
      .filter(target => target);
  }

  // --- Send

  static send({
    users = [''] || '',
    rooms = [''] || '',
    namespaces = [''] || ''
  }, event, data) {
    this.sendToUsers(users, event, data);
    this.sendToRooms(rooms, event, data);
    this.sendToNamespaces(namespaces, event, data);
  }

  static broadcast(event, data, req) {
    return this.socket(req).broadcast.emit(event, data);
  }

  static sendToAll(event, data) {
    return this.io.emit(event, data);
  }

  static sendToRooms(rooms = [''] || '', event, data, req) {
    const isIncludeSender = !req;
    return this.getListTargets(rooms)
      .filter(roomId => roomId)
      .reduce((socket, roomId) => (
        isIncludeSender
          ? socket.to(roomId)
          : socket.in(roomId)
      ), this.socket(req) || this.io)
      .emit(event, data);
  }

  static sendToNamespaces(namespaces = [''] || '', event, data) {
    return this.getListTargets(namespaces)
      .reduce((io, namespace) => io.of(namespace), this.io)
      .emit(event, data);
  }

  static sendToUsers(users = [''] || '', event, data) {
    return this.getListTargets(users)
      .map((user) => {
        const userId = typeof user === 'string'
          ? user
          : user._id;
        return this.manager.clients
          .filter(client => (
            client.handshake.session.user && client.handshake.session.user._id === userId
          ))
          .map(client => client.emit(event, data));
      });
  }

  static sendResponse(req, event, data) {
    return this.sendToClient(this.socket(req), event, data);
  }

  static sendVolatileResponse(req, event, data) {
    return this.sendVolatileToSocket(this.socket(req), event, data);
  }

  static sendToSession(sessionId, event, data) {
    if (typeof sessionId !== 'string') {
      sessionId = sessionId.id;
    }
    return this.manager.clients
      .filter(client => client.handshake.sessionId === sessionId)
      .map(client => this.sendToClient(client, event, data));
  }

  static sendVolatileToSession(sessionId, event, data) {
    if (typeof sessionId !== 'string') {
      sessionId = sessionId.id;
    }
    return this.manager.clients
      .filter(client => client.handshake.sessionId === sessionId)
      .map(client => this.sendVolatileToClient(client, event, data));
  }

  static sendToClient(client, event, data) {
    return client.emit(event, data);
  }

  static sendVolatileToClient(client, event, data) {
    return client.volatile.emit(event, data);
  }

  // --- Join

  static joinToRoom(client, roomId) {
    return client.join(roomId);
  }
};
