
const SessionService = require('../services/user/Session');

function QuerySession(socket, next) {
  if (!socket.handshake.headers.cookie) {
    const { token } = socket.handshake.query;
    if (!token) return next();
    // eslint-disable-next-line no-param-reassign
    socket.handshake.headers.cookie = `${SessionService.SSID_COOKIE_NAME}=${token}`;
  }
  return next();
}

module.exports = QuerySession;
