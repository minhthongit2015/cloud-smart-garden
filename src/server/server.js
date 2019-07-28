/* @flow */
// Libraries / Modules
// import '@babel/polyfill';
const express = require('express');
const http = require('http');
const path = require('path');
const DebugLib = require('debug');
const colors = require('colors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressEasyZip = require('express-easy-zip');
// const ConnectSessionSequelize = require('connect-session-sequelize');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const ExpressSocketIOSession = require('express-socket.io-session');
const SocketIO = require('socket.io');
const SessionService = require('./services/Session');
const SocketIOQuerySession = require('./middleware/io-query-session');
const SocketIORequestParser = require('./middleware/io-request-parser');

const routes = require('./routes');
const api = require('./api');
const wsRoutes = require('./websocket/routes');
const WebsocketManager = require('./websocket/ws-manager');
const SystemInfo = require('./utils/system-info');
const startUp = require('./utils/_startup');
const Logger = require('./services/Logger');
const { Debug } = require('./utils/constants');

const debug = DebugLib(Debug.CLOUD);

process.on('unhandledRejection', (reason) => {
  Logger.error(`Unhandled Rejection at: \t ${reason.stack || reason}`);
});
process.on('uncaughtException', (exeption) => {
  Logger.error(`Uncaught Exception at: \t ${exeption}`);
});

// Global Config
const Config = require('./config');

// Create Express Server
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Create Websocket Service
const io = SocketIO(server);
WebsocketManager.setup(io);
WebsocketManager.use(wsRoutes);

// Connect Database
// const sequelizeDB = require('./models');
// eslint-disable-next-line import/order
const mongoose = require('mongoose');
// eslint-disable-next-line import/order
const MongoStore = require('connect-mongo')(Session);
const mongodb = require('./models/mongo');

mongodb.setup();


/** *******************************************************************
 *                       -- BEGIN : Middle Ware --                    *
 ******************************************************************** */

// Enable CORS
app.use(cors());

// Serve Static file
const PUBLIC_FOLDER = path.resolve(process.cwd(), Config.publicFolder);
app.get('*.*', express.static(PUBLIC_FOLDER));

// Parse Cookie
const cookieParser = CookieParser();
app.use(cookieParser);

// Setup Session
// const SequelizeStore = ConnectSessionSequelize(Session.Store);
// const sequelizeSessionStore = new SequelizeStore({ db: sequelizeDB.sequelize });
const mongooseSessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
const session = Session({
  // store: sequelizeSessionStore,
  store: mongooseSessionStore,
  key: SessionService.SSID_COOKIE_NAME,
  secret: SessionService.SECRET,
  resave: true,
  // secure: true,
  // httpOnly: true,
  saveUninitialized: false,
  cookie: {
    // secure: false,
    // httpOnly: false,
    maxAge: 7 * 86400000 // 7 days
  },
  rolling: true,
  unset: 'destroy'
});
app.use(session);

// Prevent Browser Cache
// app.use(noCache);

// Setup for POST parser
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Setup for File upload
app.use(fileUpload());

// Setup Easy Zip
app.use(expressEasyZip());

// Routing
app.use('/api', api);
app.use('/', routes);

// Socket IO Middle Ware
io.use(SocketIORequestParser);
io.use(SocketIOQuerySession);
io.use(ExpressSocketIOSession(session, {
  autoSave: true
}));


/** *******************************************************************
 *                        -- END : Middle Ware --                     *
 ******************************************************************** */


server.listen(Config.port);
server.on('listening', () => {
  // eslint-disable-next-line no-console
  console.log(colors.rainbow(`\r\n\r\n${new Array(30).fill(' -').join('')}\r\n`));
  const address = server.address();
  if (typeof address === 'string') {
    debug(`Server running at pipe: ${address}`);
  } else {
    SystemInfo.showServerPorts(address.port, debug);
  }
  startUp();
});


const test = require('./models/test');

(async () => {
  await test();
})();

// setInterval(() => {
//   http.get('http://power-manager.herokuapp.com/');
// }, 300000); // every 5 minutes (300000)
