/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');
// const AuthService = require('../../../services/authenticator');

module.exports = class MobileConnectHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.mobileConnect, this.handleMobileToCloud.bind(this));
    return this;
  }

  async handleMobileToCloud(socket, message, res) {
    debug(colors.blue('[Mobile]'), WS_EVENTS.mobileConnect, message);
    // const user = await AuthService.authenticateByToken(message);
    // if (!user) {
    //   socket.user = user;
    //   socket.userId = user.id;
    //   return res ? res(user) : null;
    // }
    // return res ? res(user) : null;
  }
};
