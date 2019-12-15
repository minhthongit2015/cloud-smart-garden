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
const queryString = require('query-string');

const mongoDB = require('./models/mongo');
// const sequelizeDB = require('./models/sequelize');

const cors = require('./middleware/cors');
const noCache = require('./middleware/no-cache');
const ExpressSession = require('./middleware/express-session');
const SocketIOQuerySession = require('./middleware/io-query-session');
const SocketIORequestParser = require('./middleware/io-request-parser');
const CustomQueryParser = require('./middleware/CustomQueryParser');
const FacebookSession = require('./middleware/facebook-session');
const RegisterFacebookUser = require('./middleware/register-facebook-user');

const routes = require('./routes');
const api = require('./api');

const WebsocketManager = require('./websocket/ws-manager');

const SystemInfo = require('./utils/SystemInfo');
const startUp = require('./utils/_startup');

const Debugger = require('./services/Debugger');
const Logger = require('./services/Logger');

const Config = require('./config');

class Server {
  static start() {
    Debugger.log('\x1B[2J');
    Debugger.log(colors.rainbow(`\r\n\r\n${new Array(60).fill('▬').join('')}\r\n`));
    Debugger.log(`${''.padStart(12, ' ')}${colors.rainbow('START')} ${colors.yellow('BEYOND GARDEN SERVER')}\r\n`);
    Debugger.log(colors.rainbow(`${new Array(60).fill('▬').join('')}\r\n`));
    this.setupErrorTrap();
    this.setupDatabase();
    this.createServer();
    this.setupViewEngine();
    this.removeExpressHeader();
    this.setupWebsocket();
    this.setupMiddleware();
    this.setupRouting();
    this.listen();
    // this.keepAlive();
  }

  static createServer() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  static setupViewEngine() {
    const VIEWS_FOLDER = path.resolve(process.cwd(), Config.viewsFolder);
    this.app.set('views', VIEWS_FOLDER);
    this.app.set('view engine', 'ejs');
  }

  static removeExpressHeader() {
    this.app.disable('x-powered-by');
    this.app.use((req, res, next) => {
      res.removeHeader('X-Powered-By');
      next();
    });
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
    this._facebookSessionMiddleware();
    this._registerFacebookUserMiddleware();
    this._queryParserMiddleware();
    this._bodyParserMiddleware();
    this._socketIOMiddleware();
  }

  static _staticFileMiddleware() {
    const PUBLIC_FOLDER = path.resolve(process.cwd(), Config.publicFolder);
    this.app.get(/.*\..*/, express.static(PUBLIC_FOLDER));
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

  static _facebookSessionMiddleware() {
    this.app.use(FacebookSession);
  }

  static _registerFacebookUserMiddleware() {
    this.app.use(RegisterFacebookUser);
  }

  static _queryParserMiddleware() {
    this.app.use(
      expressQueryParser({
        parseNull: true,
        parseBoolean: true
      })
    );
    this.app.use(CustomQueryParser);
  }

  static _bodyParserMiddleware() {
    this.app.use(bodyParser.json({ limit: '10mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    this.app.use(fileUpload());
    this.app.use(expressEasyZip());
  }

  static _socketIOMiddleware() {
    // One time middlewares
    this.io.use(SocketIORequestParser);
    this.io.use(SocketIOQuerySession);
    this.io.use(ExpressSocketIOSession(this.expressSession, {
      autoSave: true
    }));

    // Every request middlewares
    WebsocketManager.app.use((req, res, next) => {
      req.session.reload(() => {
        next();
      });
    });
    WebsocketManager.app.use((req, res, next) => {
      req.path = req._parsedUrl.pathname;
      req.query = queryString.parse(req._parsedUrl.search, {
        arrayFormat: 'bracket',
        parseNumbers: true,
        parseBooleans: true
      });
      req.websocket = true;
      next();
    });
    WebsocketManager.app.use(
      expressQueryParser({
        parseNull: true,
        parseBoolean: true
      })
    );
    WebsocketManager.app.use(CustomQueryParser);
    WebsocketManager.app.use(FacebookSession);
    WebsocketManager.app.use(RegisterFacebookUser);
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
      const address = this.server.address();
      if (typeof address === 'string') {
        Debugger.server(`\r\n[Server running at] > pipe: ${address}`);
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
    if (process.env.NODE_ENV === 'production') {
      const minutes = 20;
      setInterval(() => {
        http.get('https://climate-strike-vietnam.herokuapp.com');
      }, minutes * 60 * 1000);
    }
  }

  static setupErrorTrap() {
    Debugger.server(`${colors.yellow('Process Protection Enabled')}`);
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
