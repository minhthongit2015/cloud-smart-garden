/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');

module.exports = class Mobile2GardenHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.mobile2Garden, this.handleMobileToGarden.bind(this));
    return this;
  }

  async handleMobileToGarden(socket, message) {
    debug(colors.blue('[Mobile]'), WS_EVENTS.mobile2Garden, message);
    const socketGarden = this.manager.clientArray
      .find(client => client.gardenId === message.gardenId);
    if (!socketGarden) return null;

    this.manager.clientArray.forEach((client) => {
      if (!client.gardenId && !client.userId) {
        client.emit(WS_EVENTS.command, message);
      }
    });
    return socketGarden.emit(WS_EVENTS.command, message);
  }
};
