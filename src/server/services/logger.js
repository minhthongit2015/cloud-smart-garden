const winston = require('winston');

const { createLogger, transports } = winston;

const logger = createLogger({
  transports: [
    new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({ filename: 'combined.log', json: true, timestamp: true })
  ],
  exceptionHandlers: [
    new (transports.Console)({ json: true, timestamp: true }),
    new transports.File({ filename: 'exceptions.log', json: true, timestamp: true })
  ],
  exitOnError: false
});

module.exports = logger;
