/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
const GardenService = require('../../services/garden');
const AuthService = require('../../services/authenticator');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.mobile2Cloud);
    this.addListener(this.handleMobileToCloud.bind(this));
  }

  async handleMobileToCloud(socket, type, message, res) {
    console.log(WS_EVENTS.mobile2Cloud, message);
    switch (type) {
    case 'connect':
    {
      const user = await AuthService.authenticateByToken(message);
      if (!user) {
        if (res) {
          socket.user = user;
          socket.userId = user.id;
          res(user);
          break;
        }
      } else if (res) {
        res(null);
      }
      break;
    }
    case 'watch':
      socket.gardens = message;
      break;
    case 'leave':
      socket.gardens = [];
      break;
    default:
      break;
    }
  }
};
