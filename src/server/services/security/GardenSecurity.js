const HttpErrors = require('http-errors');
// const { errorOrFalse } = require('./SecurityHelper');
const SecurityService = require('./SecurityService');


module.exports = class extends SecurityService {
  static onlyValidRecord(record, throwError = true) {
    return this.onlyNotNullObject(record, throwError);
  }

  static onlyVerifiedStation(station, throwError = true) {
    return this.onlyNotNullObject(station, throwError, HttpErrors.Unauthorized());
  }
};
