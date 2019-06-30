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
const socketIO = require('socket.io');
const routes = require('./routes');
const api = require('./api');
const WebsocketManager = require('./websocket');
const SystemInfo = require('./utils/system-info');
const startUp = require('./startup');

// Global Config
const serverConfig = require('./config');

// Init the Server
const app = express();

// Setup Easy Zip
app.use(expressEasyZip());

// Setup Database
const sequelizeDB = require('./models');
const mongodb = require('./models/mongo');

mongodb.setup();


const SequelizeStore = ConnectSessionSequelize(Session.Store);

// Setup for CORS | Session | Cookie
const session = Session({
  store: new SequelizeStore({ db: sequelizeDB.sequelize }),
  // store: new PgSession({ conObject }),
  key: 'user_sid',
  secret: 'HkF1KkHBQ8',
  resave: true,
  // secure: true,
  // httpOnly: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 365 * 86400000 // 365 days
  },
  rolling: true
});

const cookieParser = CookieParser();
app.use(cookieParser);
app.use(cors());
app.use(session);

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

app.use('/api', api);
app.use('/', routes);

// Setup HTTP Server
const server = http.createServer(app);
const io = socketIO(server);

WebsocketManager.setup(io);

server.listen(serverConfig.port);
server.on('listening', () => {
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
