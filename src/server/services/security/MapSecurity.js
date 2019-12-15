const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const SecurityService = require('./index');


module.exports = class extends SecurityService {
  static filterUnallowedProperties(place) {
    if (!place || typeof place !== 'object') {
      return null;
    }
    const allowedProps = [
      '_id',
      '__t',
      'name',
      'post',
      'avatar',
      'cover',
      'images',
      'description',
      'address',
      'time',
      'link',
      'position',
      'zoom',
      'path',
      'radius',
      'type',
      // 'events',
      'prev',
      'next'
    ];
    Object.keys(place).forEach((key) => {
      if (!allowedProps.includes(key)) {
        delete place[key];
      }
    });
    return place;
  }

  static onlyValidPlace(place, throwError = true) {
    if (!place || !place.author) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    return true;
  }

  static onlyModAdminActivist(req, place, throwError = true) {
    if (!this.onlyValidPlace(place, false)) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    if (this.onlyModOrAdmin(req, false)) {
      return true;
    }
    if (place.__t !== 'Activist') {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyOwner(req, place, throwError = true) {
    const userId = req.session.user._id.toString();
    if (!place || !place.author || place.author._id !== userId) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyOwnerModAdmin(req, place, throwError = true) {
    if (!this.onlyLoggedInUser(req, false)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (this.onlyModOrAdmin(req, false)) {
      return true;
    }
    return this.onlyOwner(req, place, throwError);
  }
};
