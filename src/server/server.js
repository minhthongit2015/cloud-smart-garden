// Libraries / Modules
import '@babel/polyfill';
import express from 'express';
import http from 'http';
import path from 'path';
import debug from 'debug';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import routes from './routes';
import apis from './apis';

// Global Config
import { Server as serverConfig } from '../config';

// Setup Debugging
const serverDebug = debug('app:server');

// Init the Server
const app = express();

// Setup for POST parser
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Setup for File upload
app.use(fileUpload());

// Routing
const PUBLIC_FOLDER = path.resolve(process.cwd(), serverConfig.publicFolder);
app.get('*.*', express.static(PUBLIC_FOLDER));

app.use('/api', apis);
app.use('/', routes);

// Setup HTTP Server
const server = http.createServer(app);
server.listen(serverConfig.port);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port + ${address.port}`;
  serverDebug(`Server running at: ${bind}`);
});

// setInterval(() => {
//   http.get('http://power-manager.herokuapp.com/');
// }, 300000); // every 5 minutes (300000)
