
const Logger = require('./Logger');
const APIResponse = require('../models/api-models');


module.exports = class {
  static get Logger() { return Logger; }

  static defaultAPIErrorHandler(error, res, code = 400) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(code).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
};
