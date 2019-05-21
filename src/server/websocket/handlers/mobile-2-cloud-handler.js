/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.mobile2Cloud);
    this.addListener(this.handleMobileToCloud.bind(this));
  }

  async handleMobileToCloud(socket, type, message) {
    console.log(WS_EVENTS.mobile2Cloud, message);
    switch (type) {
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
