
const crypto = require('crypto');

const SECRET = process.env.SECRET || 'HkF1KkHBQ8';
const SSID_COOKIE_NAME = 'user_ssid';

module.exports = class SessionService {
  static get SECRET() { return SECRET; }

  static get SSID_COOKIE_NAME() { return SSID_COOKIE_NAME; }

  static async update(session, props) {
    Object.assign(session, props);
    return this.save(session);
  }

  static async save(session) {
    return new Promise(resolve => session.save(resolve));
  }

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

  static async checkForDirtySession(session) {
    let isDirty = false;
    isDirty = isDirty || this.checkForDirtyUser(session.user);
    // TODO: update on all related sessions (sessions of the same user)
    return isDirty
      ? this.save(session)
      : undefined;
  }

  static checkForDirtyUser(user) {
    const isDirty = user && user.dirty;
    if (isDirty) {
      delete user.dirty;
    }
    return isDirty;
  }

  // ---

  static getEntities(req) {
    return {
      session: req.session,
      headers: req.headers,
      cookie: req.cookie,
      params: req.params,
      query: req.query,
      body: req.body,
      socket: req.socket,

      user: req.session.user,
      fbUser: req.session.fbUser,
      garden: req.session.garden,
      station: req.session.station
    };
  }
};
