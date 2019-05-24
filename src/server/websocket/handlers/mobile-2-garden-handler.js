/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
const GardenService = require('../../services/garden');

module.exports = class Mobile2GardenHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.mobile2Garden);
    this.addListener(this.handleMobileToGarden.bind(this));
  }

  async handleMobileToGarden(socket, message) {
    debug(colors.blue('[Mobile]'), WS_EVENTS.mobile2Garden, message);
    const socketGarden = this.manager.clientArray.find(client => client.gardenId === message.gardenId);
    if (!socketGarden) return null;

    this.manager.clientArray.forEach(client => {
      if (!client.gardenId && !client.userId) {
        client.emit(WS_EVENTS.command, message);
      }
    });
    return socketGarden.emit(WS_EVENTS.command, message);
  }
};
