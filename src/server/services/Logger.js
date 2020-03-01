const winston = require('winston');
const path = require('path');
const colors = require('colors');
const Debugger = require('./Debugger');
const APIResponse = require('../models/api-models/APIResponse');
const Config = require('../config');

const { createLogger, transports } = winston;

const logDir = path.resolve(Config.logsFolder);

const logger = createLogger({
  transports: [
    // new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({
      dirname: logDir, filename: 'combined.log', json: true, timestamp: true
    })
  ],
  exceptionHandlers: [
    // new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({
      dirname: logDir, filename: 'exceptions.log', json: true, timestamp: true
    })
  ],
  exitOnError: false
});

async function _tryCatch(func, errorHandler, ...args) {
  try {
    await func(...args);
  } catch (error) {
    this.handleError(error, errorHandler, ...args);
  }
}

function _handleError(error, errorHandler, ...args) {
  Debugger.server(
    `${colors.yellow('<!>')} ${colors.blue('Error Catched:')} ${colors.red(colors.red(error.message))}`
  );
  this.error(error.message, {
    stack: error.stack
  });
  if (typeof errorHandler === 'function') {
    errorHandler(error, ...args);
    return;
  }
  const [req, res] = args;
  if (req && req.api) {
    delete error.stack; // No stack will be send to the client
    const errorCode = error.statusCode || error.status || error.code || 400;
    if (errorCode === 401 && req.websocket) {
      res.emit('unauthorized');
    } else {
      res.status(errorCode)
        .send(APIResponse.setError(error));
    }
  }
}

function _catch(func, errorHandler) {
  return (...args) => this.tryCatch(func, errorHandler, ...args);
}

Object.getPrototypeOf(logger).tryCatch = _tryCatch;
Object.getPrototypeOf(logger).handleError = _handleError;
Object.getPrototypeOf(logger).catch = _catch;


module.exports = logger;
