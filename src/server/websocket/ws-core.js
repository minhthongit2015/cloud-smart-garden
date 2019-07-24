/* @flow */
const path = require('path');
const wsDebug = require('debug')('app:wsserver');
const { WS_EVENTS } = require('../../shared/constants');
const Logger = require('../services/Logger');

module.exports = class WebsocketManagerCore {
  /**
   * alias of `.wsServer`
   */
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

  static get routers() {
    this._routers = this._routers || [];
    return this._routers;
  }

  static get handlers() {
    if (!this._handlers) this._handlers = {};
    return this._handlers;
  }

  static setup(wsServer) {
    this.wsServer = wsServer;
    wsServer.on(WS_EVENTS.connection, (socket) => {
      try {
        wsDebug('Client connected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
        this.accept(socket);

        socket.on(WS_EVENTS.disconnect, () => {
          wsDebug('Client disconnected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
        });
      } catch (wsClientError) {
        Logger.error({ message: wsClientError.message, stack: wsClientError.stack });
      }
    });
  }

  static use(router) {
    this.routers.push(router);
    this._storeHandlers(router);
    this.clientArray.forEach((client) => {
      this._attachRouterToClient(router, client);
    });
  }

  static accept(client) {
    // eslint-disable-next-line no-param-reassign
    client.manager = this;
    this.routers.forEach(router => this._attachRouterToClient(router, client));
  }

  static _attachRouterToClient(router, client) {
    Object.keys(this.handlers).forEach((eventName) => {
      client.on(eventName, (...args) => this._onEvent(eventName, client, ...args));
    });
  }

  static _storeHandlers(router) {
    const { fullRoutePath, handlers, children } = router;
    handlers.forEach((handler) => {
      const handlerPath = path.posix.join(handler[2] ? `${handler[2].toUpperCase()} ` : '', fullRoutePath || '/', handler[0]);
      if (!this.handlers[handlerPath]) this.handlers[handlerPath] = [];
      this.handlers[handlerPath].push(handler[1]);
    });
    children.forEach(childRouter => this._storeHandlers(childRouter));
  }

  static _onEvent(event, client, ...args) {
    if (!this.handlers[event] || !this.handlers[event].length) return;
    const [body, clientRes] = args;
    const req = {
      socket: client,
      session: client.handshake.session || {},
      body
    };
    const res = {
      send: (response) => {
        if (clientRes) clientRes(response);
      }
    };
    this.handlers[event].forEach((handler) => {
      handler(req, res);
    });
  }
};
