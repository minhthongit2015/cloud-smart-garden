/* @flow */
const wsDebug = require('debug')('app:wsserver');
const { WS_EVENTS } = require('../../shared/constants');
const Logger = require('../services/Logger');

module.exports = class WebsocketManagerCore {
  static get io() {
    return this.wsServer;
  }

  static get clients() {
    try {
      return this.wsServer.sockets.sockets;
    } catch {
      return [];
    }
  }

  static get clientArray() {
    return Object.keys(this.clients).map(key => this.clients[key]);
  }

  static getClientById(socketId) {
    return this.clients[socketId];
  }

  static get handlers() {
    this._handlers = this._handlers || [];
    return this._handlers;
  }

  static setup(wsServer) {
    this.wsServer = wsServer;
    wsServer.on(WS_EVENTS.connection, (socket) => {
      try {
        wsDebug('Client connected: ', socket.id, socket.conn.remoteAddress);
        this.accept(socket);

        socket.on(WS_EVENTS.disconnect, () => {
          wsDebug('Client disconnected: ', socket.id, socket.conn.remoteAddress);
        });
      } catch (wsClientError) {
        Logger.error({ message: wsClientError.message, stack: wsClientError.stack });
      }
    });
  }

  static registerHandler(handler) {
    this.handlers.push(handler);
    handler.setup(this);
    this.clientArray.forEach((client) => {
      this._attachHandlerToClient(handler, client);
    });
  }

  static accept(client) {
    this.handlers.forEach(handler => this._attachHandlerToClient(handler, client));
  }

  static _attachHandlerToClient(handler, client) {
    const events = handler.eventNames();
    events.forEach((event) => {
      client.on(event, (...args) => handler.emit(event, args));
    });
  }
};
