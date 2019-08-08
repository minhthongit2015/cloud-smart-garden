const path = require('path');
const urlParser = require('url');
const DebugLib = require('debug');
const pathMatch = require('path-match')({
  sensitive: false,
  strict: false,
  end: false
});
const Logger = require('../services/Logger');
const { Debug } = require('../utils/constants');

const debug = DebugLib(Debug.ws.CORE);
const debugSetupRouting = DebugLib(Debug.ws.SETUP_ROUTING);

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
    if (!this._handlers) this._handlers = new Map();
    return this._handlers;
  }

  static setup(wsServer) {
    this.wsServer = wsServer;
    wsServer.on('connection', (socket) => {
      try {
        debug('Client connected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
        this.accept(socket);

        socket.on('disconnect', () => {
          debug('Client disconnected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
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

  static _storeHandlers(router) {
    const { fullRoutePath, handlers, children } = router;
    children.forEach(childRouter => this._storeHandlers(childRouter));
    handlers.forEach((handler) => {
      const handlerPath = path.posix.join(handler[2] ? `/${handler[2].toUpperCase()}/` : '', fullRoutePath || '/', handler[0]);
      const handlerMatch = pathMatch(handlerPath);
      debugSetupRouting(handlerPath);
      this.handlers.set(handlerMatch, {
        handler: handler[1],
        pattern: handlerPath
      });
    });
  }

  static accept(client) {
    // eslint-disable-next-line no-param-reassign
    client.manager = this;
    client.on('*', (...args) => this._onEvent(client, ...args));
  }

  static async _onEvent(client, ...args) {
    const [urlPathQuery, request, clientRes] = args[0].data;
    const url = urlParser.parse(`http://${path.posix.join('localhost', urlPathQuery)}`);
    const { pathname } = url;
    const iterator = this.handlers.entries();
    let handler = iterator.next();
    const req = {
      socket: client,
      session: client.handshake.session || {},
      sessionID: client.handshake.sessionID,
      sessionStore: client.handshake.sessionStore,
      originalUrl: urlPathQuery,
      baseUrl: pathname,
      url: pathname,
      pathname,
      ...request
    };
    const res = {
      send: (response) => {
        if (clientRes) clientRes(response);
      }
    };
    do {
      const [match, handleFunc] = handler.value;
      const params = match(pathname);
      if (params) {
        req.params = params;
        // eslint-disable-next-line no-await-in-loop
        const canGo = await handleFunc.handler(req, res);
        if (!canGo) break;
      }
      handler = iterator.next();
    } while (handler && !handler.done);
  }

  static sendToClient(clientId, {
    event = '',
    body = ''
  }) {
    this.getClientById(clientId).emit(event, body);
  }
};
