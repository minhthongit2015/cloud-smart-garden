/* @flow */
// Libraries / Modules
// import '@babel/polyfill';
const express = require('express');
const http = require('http');
const path = require('path');
const debug = require('debug')('app:server');
const colors = require('colors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressEasyZip = require('express-easy-zip');
const ConnectSessionSequelize = require('connect-session-sequelize');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const ExpressSocketIOSession = require('express-socket.io-session');
const SocketIO = require('socket.io');
const crypto = require('crypto');
const routes = require('./routes');
const api = require('./api');
const wsRoutes = require('./websocket/routes');
const WebsocketManager = require('./websocket/ws-manager');
const SystemInfo = require('./utils/system-info');
const startUp = require('./utils/_startup');
const Logger = require('./services/Logger');

process.on('unhandledRejection', (reason) => {
  Logger.error(`Unhandled Rejection at: \t ${reason.stack || reason}`);
});
process.on('uncaughtException', (exeption) => {
  Logger.error(`Uncaught Exception at: \t ${exeption}`);
});

// Global Config
const Config = require('./config');

// Init the Server
const app = express();

// Setup Easy Zip
app.use(expressEasyZip());

// Setup Database
const sequelizeDB = require('./models');
// const mongodb = require('./models/mongo');

// mongodb.setup();


const SequelizeStore = ConnectSessionSequelize(Session.Store);

// Setup for CORS | Session | Cookie
const secret = 'HkF1KkHBQ8';
const sessionCookieName = 'user_sid';
const sessionStore = new SequelizeStore({ db: sequelizeDB.sequelize });
const session = Session({
  store: sessionStore,
  // store: new PgSession({ conObject }),
  key: sessionCookieName,
  secret,
  resave: true,
  // secure: true,
  // httpOnly: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 7 * 86400000 // 7 days
  },
  rolling: true,
  unset: 'destroy'
});

const cookieParser = CookieParser();
app.use(cookieParser);
app.use(cors());
app.use(session);

// Prevent Browser Cache
// function noCache(req, res, next) {
//   res.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1
//   res.set('Pragma', 'no-cache'); // HTTP 1.0
//   res.set('Expires', '0'); // Proxies
//   next();
// }
// app.use(noCache);

// Setup for POST parser
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Setup for File upload
app.use(fileUpload());

// Routing
const PUBLIC_FOLDER = path.resolve(process.cwd(), Config.publicFolder);
app.get('*.*', express.static(PUBLIC_FOLDER));

app.use('/api', api);
app.use('/', routes);

// Setup HTTP Server
const server = http.createServer(app);
const io = SocketIO(server);

function tokenToCookie(socket, next) {
  if (!socket.handshake.headers.cookie) {
    const { token } = socket.handshake.query;
    if (!token) return next();
    const fakeCookie = `${token}.${crypto
      .createHmac('sha256', secret)
      .update(token)
      .digest('base64')
      .replace(/=+$/, '')}`;
    // eslint-disable-next-line no-param-reassign
    socket.handshake.headers.cookie = `${sessionCookieName}=s:${fakeCookie}`;
  }
  return next();
}
io.use(tokenToCookie);
io.use(ExpressSocketIOSession(session, {
  autoSave: true
}));
WebsocketManager.setup(io, sessionStore);
WebsocketManager.use(wsRoutes);

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
