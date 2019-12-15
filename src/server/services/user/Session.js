
const crypto = require('crypto');

const SECRET = process.env.SECRET || 'HkF1KkHBQ8';
const SSID_COOKIE_NAME = 'user_ssid';

module.exports = class SessionService {
  static get SECRET() { return SECRET; }

  static get SSID_COOKIE_NAME() { return SSID_COOKIE_NAME; }

  static getFullSessionId(sessionId) {
    const secretPart = crypto.createHmac('sha256', this.SECRET)
      .update(sessionId)
      .digest('base64')
      .replace(/=+$/, '');
    const getFullSessionId = `${sessionId}.${secretPart}`;
    return `s:${getFullSessionId}`;
  }

  static deleteAllSession() {

  }

  static async checkForDirtySession(req) {
    let isDirty = false;
    isDirty = isDirty || this.checkForDirtyUser(req);
    return isDirty
      ? new Promise(resolve => req.session.save(resolve))
      : undefined;
  }

  static checkForDirtyUser(req) {
    const isDirty = req.session.user && req.session.user.dirty;
    if (isDirty) {
      delete req.session.user.dirty;
    }
    return isDirty;
  }
};
