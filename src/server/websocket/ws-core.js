const websocketCoreApp = require('express').Router();
const queryString = require('query-string');
const expressQueryParser = require('express-query-parser');
const Logger = require('../services/Logger');
const Debugger = require('../services/Debugger');

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

  static setup(wsServer) {
    Debugger.wsSetup('Setup Websocket Core');
    websocketCoreApp.use((req, res, next) => {
      Object.assign(req, req._parsedUrl);
      req.query = queryString.parse(req._parsedUrl.search);
      req.websocket = true;
      next();
    });
    websocketCoreApp.use(
      expressQueryParser({
        parseNull: true,
        parseBoolean: true
      })
    );

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
    const [originUrl, parsedRequest, clientRes] = args[0].data;
    const req = this._buildRequest(client, originUrl, parsedRequest);
    const res = this._buildResponse(clientRes, req);
    websocketCoreApp(req, res, () => {});
  }

  static _buildRequest(client, originUrl, parsedRequest) {
    const req = function req() {
    };
    Object.assign(req, {
      method: parsedRequest.method,
      url: parsedRequest.url,
      body: parsedRequest.body,
      socket: client,
      session: client.handshake.session || {},
      sessionID: client.handshake.sessionID,
      sessionStore: client.handshake.sessionStore
    });
    return req;
  }

  static _buildResponse(clientRes, req) {
    const res = function res() {
    };
    Object.assign(res, {
      req,
      socket: req.socket
    });
    const proto = Object.getPrototypeOf(res);
    proto.send = function send(response) {
      if (clientRes) clientRes(response);
      return this;
    };
    proto.status = function status() {
      return this;
    };
    proto.emit = function emit(...args) {
      this.socket.emit(args);
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
