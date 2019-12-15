const winston = require('winston');
const path = require('path');
const colors = require('colors');
const Debugger = require('./Debugger');
const ApiResponse = require('../models/api-models');
const Config = require('../config');

const { createLogger, transports } = winston;

const logDir = path.resolve(Config.logsFolder);

const Logger = createLogger({
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

Logger.catch = async function _catch(func, handler = () => {}) {
  try {
    await func();
  } catch (error) {
    Debugger.server(
      `${colors.yellow('<!>')} ${colors.blue('Error Catched:')} ${colors.red(colors.red(error.message))}`
    );
    this.error(error.message, {
      stack: error.stack
    });
    if (typeof handler === 'function') {
      handler(error);
    }
    if (typeof handler === 'object') {
      const { req, res } = handler;
      if (req && req.api) {
        delete error.stack; // No stack will be send to the client
        res.status(error.statusCode || error.status || error.code || 400)
          .send(new ApiResponse().setError(error));
      }
    }
  }
};

module.exports = Logger;
