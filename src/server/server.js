// Libraries / Modules
// import '@babel/polyfill';
const express = require('express');
const http = require('http');
const path = require('path');
const debug = require('debug');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ConnectPgSimple = require('connect-pg-simple');
const ConnectSessionSequelize = require('connect-session-sequelize');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const socketIO = require('socket.io');
const routes = require('./routes');
const apis = require('./apis');
const WebsocketManager = require('./websocket');
const Gardener = require('./services/gardener');
const SystemInfo = require('./helpers/system-info');
const dbConfigs = require('../config/db');

// Global Config
const serverConfig = require('../config/server');

// Setup Debugging
const serverDebug = debug('app:server');

// Init the Server
const app = express();

// Setup DB
const env = process.env.NODE_ENV || 'development';
const dbConfig = dbConfigs[env];

// const sequelize = new Sequelize(dbConfig.dbPostgresURI, {
//   'dialect': dbConfig.dbPostgresDialect
// });
const sequelizeDB = require('./models');

const SequelizeStore = ConnectSessionSequelize(Session.Store);

// Setup for CORS | Session | Cookie
const PgSession = ConnectPgSimple(Session);
const conObject = {
  user: dbConfig.dbPostgresUsername,
  password: dbConfig.dbPostgresPassword,
  host: dbConfig.dbPostgresHost,
  port: dbConfig.dbPostgresPort,
  database: dbConfig.dbPostgresDatabase,
  conString: dbConfig.dbPostgresURI,
  ssl: true
  // uri: dbConfig.dbPostgresURI
};
const session = Session({
  store: new SequelizeStore({ db: sequelizeDB.sequelize }),
  // store: new PgSession({ conObject }),
  key: 'user_sid',
  secret: 'HkF1KkHBQ8',
  resave: true,
  secure: true,
  httpOnly: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 365 * 86400000 // 365 days
  },
  rolling: true
});

const cookieParser = CookieParser();
app.use(cookieParser);
app.use(session);
app.use(cors());

// Prevent Browser Cache
function noCache(req, res, next) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1
  res.set('Pragma', 'no-cache'); // HTTP 1.0
  res.set('Expires', '0'); // Proxies
  next();
}
app.use(noCache);

// Setup for POST parser
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Setup for File upload
app.use(fileUpload());

// Routing
const PUBLIC_FOLDER = path.resolve(process.cwd(), serverConfig.publicFolder);
app.get('*.*', express.static(PUBLIC_FOLDER));

app.use('/apis', apis);
app.use('/', routes);

// Setup HTTP Server
const server = http.createServer(app);
const io = socketIO(server);

WebsocketManager.setup(io);

server.listen(serverConfig.port);
server.on('listening', () => {
  const address = server.address();
  if (typeof address === 'string') {
    serverDebug(`Server running at pipe: ${address}`);
  } else {
    SystemInfo.showServerPorts(address.port, serverDebug);
  }
  Gardener.startWorking();
});


// setInterval(() => {
//   http.get('http://power-manager.herokuapp.com/');
// }, 300000); // every 5 minutes (300000)
