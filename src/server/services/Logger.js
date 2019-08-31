const winston = require('winston');
const path = require('path');

const { createLogger, transports } = winston;

const logDir = path.resolve(__dirname, 'src/server/logs');

const Logger = createLogger({
  transports: [
    new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({
      dirname: logDir, filename: 'combined.log', json: true, timestamp: true
    })
  ],
  exceptionHandlers: [
    new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({
      dirname: logDir, filename: 'exceptions.log', json: true, timestamp: true
    })
  ],
  exitOnError: false
});

Logger.catch = async function _catch(func) {
  try {
    await func();
  } catch (error) {
    this.error(error.message, {
      stack: error.stack
    });
  }
};

module.exports = Logger;
