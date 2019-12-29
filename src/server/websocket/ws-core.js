const websocketCoreApp = require('express').Router();
const Logger = require('../services/Logger');
const Debugger = require('../services/Debugger');

module.exports = class WebsocketManagerCore {
  /**
   * alias of `.wsServer`
   */
  static get app() {
    return websocketCoreApp;
  }

  static get io() {
    return this.wsServer;
  }

  static get clientsMap() {
    try {
      return this.wsServer.sockets.sockets;
    } catch {
      return [];
    }
  }

  static get clients() {
    return Object.values(this.clientsMap);
  }

  static getClientById(socketId) {
    return this.clientsMap[socketId];
  }

  static setup(wsServer) {
    Debugger.wsSetup('Setup Websocket Core');
    this.wsServer = wsServer;
    wsServer.on('connection', (socket) => {
      try {
        Debugger.wsCore('Client connected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
        this.accept(socket);

        socket.on('disconnect', () => {
          Debugger.wsCore('Client disconnected: ', socket.handshake.sessionID, socket.conn.remoteAddress);
        });
      } catch (wsClientError) {
        Logger.error({ message: wsClientError.message, stack: wsClientError.stack });
      }
    });
  }

  static use(path, router) {
    websocketCoreApp.use(path, router);
  }

  static accept(client) {
    // eslint-disable-next-line no-param-reassign
    client.manager = this;
    client.on('*', (...args) => this._onEvent(client, ...args));
  }

  static async _onEvent(client, ...args) {
    const [originalUrl, parsedRequest, clientRes] = args[0].data;
    const req = this._buildRequest(client, originalUrl, parsedRequest);
    const res = this._buildResponse(clientRes, req);
    websocketCoreApp(req, res, () => {});
  }

  static _buildRequest(client, originalUrl, parsedRequest) {
    const headers = {};
    Object.entries(parsedRequest.headers).forEach(([key, value]) => {
      headers[key.toLowerCase()] = value;
    });
    return {
      method: parsedRequest.method,
      url: parsedRequest.url,
      body: parsedRequest.body,
      headers,
      socket: client,
      session: client.handshake.session || {},
      sessionID: client.handshake.sessionID,
      sessionStore: client.handshake.sessionStore
    };
  }

  static _buildResponse(clientRes, req) {
    const res = {
      req,
      socket: req.socket
    };
    req.res = res;
    res.send = function send(response) {
      if (clientRes) clientRes(response);
      return this;
    };
    res.status = function status() {
      return this;
    };
    // sending to the client
    res.emit = function emit(...args) {
      if (!this.socket) return this;
      this.socket.emit(...args);
      return this;
    };
    res.end = function end() {
      return this;
    };
    return res;
  }

  static sendToClient(clientId, {
    event = '',
    body = ''
  }) {
    this.getClientById(clientId).emit(event, body);
  }
};
