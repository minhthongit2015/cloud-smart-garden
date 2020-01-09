const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const { UserRole } = require('../../utils/Constants');


module.exports = class {
  static onlyNotNullObject(object, throwError = true, error = null) {
    if (object == null) {
      return errorOrFalse(error || HttpErrors.BadRequest(), throwError);
    }
    return true;
  }

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

  static onlyOwner(req, ownerId, throwError = true) {
    const userId = req.session.user._id;
    if (userId.toString() !== ownerId.toString()) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyOwnerOrModOrAdmin(req, ownerId, throwError = true) {
    if (!this.onlyLoggedInUser(req, throwError)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (this.onlyModOrAdmin(req, false)) {
      return true;
    }
    return this.onlyOwner(req, ownerId, throwError);
  }
};
