// import '@babel/polyfill';
const express = require('express');
const http = require('http');
const path = require('path');
const colors = require('colors');
const bodyParser = require('body-parser');
const expressQueryParser = require('express-query-parser');
const fileUpload = require('express-fileupload');
const expressEasyZip = require('express-easy-zip');
const CookieParser = require('cookie-parser');
const ExpressSocketIOSession = require('express-socket.io-session');
const SocketIO = require('socket.io');

const mongoDB = require('./models/mongo');
// const sequelizeDB = require('./models/sequelize');

const cors = require('./middleware/cors');
const noCache = require('./middleware/no-cache');
const ExpressSession = require('./middleware/express-session');
const SocketIOQuerySession = require('./middleware/io-query-session');
const SocketIORequestParser = require('./middleware/io-request-parser');

const routes = require('./routes');
const api = require('./api');

const WebsocketManager = require('./websocket/ws-manager');

const SystemInfo = require('./utils/system-info');
const startUp = require('./utils/_startup');

const Debugger = require('./services/Debugger');
const Logger = require('./services/Logger');

const Config = require('./config');

class Server {
  static start() {
    Server.setupErrorTrap();
    Server.setupDatabase();
    Server.createServer();
    Server.setupWebsocket();
    Server.setupMiddleware();
    Server.setupRouting();
    Server.listen();
    // Server.keepAlive(); // Not now
  }

  static createServer() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  static setupDatabase() {
    mongoDB.setup();
    // sequelizeDB.setup(false);
  }

  static setupWebsocket(server) {
    this.io = SocketIO(server || this.server);
    WebsocketManager.setup(this.io);
  }

  static setupMiddleware() {
    this._staticFileMiddleware();
    this._corsMiddleware();
    // this._noCacheMiddleware();
    this._cookieParserMiddleware();
    this._expressSessionMiddleware();
    this._queryParserMiddleware();
    this._bodyParserMiddleware();
    this._socketIOMiddleware();
  }

  static _staticFileMiddleware() {
    const PUBLIC_FOLDER = path.resolve(process.cwd(), Config.publicFolder);
    this.app.get('*.*', express.static(PUBLIC_FOLDER));
  }

  static _corsMiddleware() {
    this.app.use(cors);
  }

  static _noCacheMiddleware() {
    this.app.use(noCache);
  }

  static _cookieParserMiddleware() {
    const cookieParser = CookieParser();
    this.app.use(cookieParser);
  }

  static _expressSessionMiddleware() {
    this.expressSession = ExpressSession('mongo');
    this.app.use(this.expressSession);
  }

  static _queryParserMiddleware() {
    this.app.use(
      expressQueryParser({
        parseNull: true,
        parseBoolean: true
      })
    );
  }

  static _bodyParserMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(fileUpload());
    this.app.use(expressEasyZip());
  }

  static _socketIOMiddleware() {
    this.io.use(SocketIORequestParser);
    this.io.use(SocketIOQuerySession);
    this.io.use(ExpressSocketIOSession(this.expressSession, {
      autoSave: true
    }));
    this.io.use((socket, next) => {
      socket.handshake.session.idz = socket.handshake.session.id; // force save session to database
      next();
    });
  }

  static setupRouting() {
    this._setupAppRouting();
    this._setupWebsocketRouting();
  }

  static _setupAppRouting() {
    this.app.use('/api', api);
    this.app.use('/', routes);
  }

  static _setupWebsocketRouting() {
    WebsocketManager.use('/api', api);
  }

  static listen() {
    this.server.listen(Config.port);
    this.server.on('listening', () => {
      Debugger.log(colors.rainbow(`\r\n\r\n${new Array(30).fill(' -').join('')}\r\n`));
      const address = this.server.address();
      if (typeof address === 'string') {
        Debugger.server(`Server running at pipe: ${address}`);
      } else {
        SystemInfo.showServerPorts(address.port, Debugger.server);
      }
      this.runStartUpTasks();
    });
  }

  static runStartUpTasks() {
    startUp();
  }

  static keepAlive() {
    const minutes = 15;
    setInterval(() => {
      http.get('https://yoth-garden.herokuapp.com');
    }, minutes * 60 * 1000);
  }

  static setupErrorTrap() {
    process.on('unhandledRejection', (reason) => {
      Logger.error(
        `${colors.yellow('<!>')} Unhandled Rejection: \t ${colors.red(reason.message)}`,
        { stack: reason.stack }
      );
    });
    process.on('uncaughtException', (exeption) => {
      Logger.error(
        `${colors.yellow('<!>')} Uncaught Exception: \t ${colors.red(exeption)}`,
        { stack: exeption.stack }
      );
    });
  }
}

Server.start();
