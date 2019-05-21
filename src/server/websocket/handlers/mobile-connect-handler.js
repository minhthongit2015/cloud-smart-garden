/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
const AuthService = require('../../services/authenticator');

module.exports = class extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.mobileConnect);
    this.addListener(this.handleMobileToCloud.bind(this));
  }

  async handleMobileToCloud(socket, message, res) {
    console.log(WS_EVENTS.mobileConnect, message);
    const user = await AuthService.authenticateByToken(message);
    if (!user) {
      socket.user = user;
      socket.userId = user.id;
      return res ? res(user) : null;
    }
    return res ? res(user) : null;
  }
};
