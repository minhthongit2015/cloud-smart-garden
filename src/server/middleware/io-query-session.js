
const SessionService = require('../services/user/Session');

function QuerySession(socket, next) {
  if (!socket.handshake.headers.cookie) {
    const { token, fromStation } = socket.handshake.query;
    if (!token || !token.length || token.length < 10) return next();
    // eslint-disable-next-line no-param-reassign
    socket.handshake.headers.cookie = `${SessionService.SSID_COOKIE_NAME}=${token}`;
    if (fromStation) {
      socket.fromStation = fromStation;
    }
  }
  return next();
}

module.exports = QuerySession;
