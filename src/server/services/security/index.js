const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const { UserRole } = require('../../utils/Constants');


module.exports = class {
  static onlyLoggedInUser(req, throwError = true) {
    if (!req.session.user) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyRoleUser(req, throwError = true) {
    if (!this.onlyLoggedInUser(req, throwError)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (!req.session.user.role || typeof req.session.user.role !== 'string') {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyModerator(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (req.session.user.role !== UserRole.MODERATOR) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyAdmin(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (req.session.user.role !== UserRole.ADMIN) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyModOrAdmin(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (req.session.user.role !== UserRole.MODERATOR
      && req.session.user.role !== UserRole.ADMIN) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }
};
