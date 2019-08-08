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

module.exports = Logger;
