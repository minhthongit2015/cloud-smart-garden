/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
const GardenService = require('../../services/garden');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.garden2Mobile);
    this.addListener(this.handleGardenToMobile.bind(this));
  }

  async handleGardenToMobile(socket, type, message) {
    console.log(WS_EVENTS.garden2Mobile, message);
    switch (type) {
    case 'connect':
    {
      socket.gardenPhysicalAddress = message;
      socket.type = 'garden';
      const garden = await GardenService.getGardenByPhysicalAddress(message);
      socket.gardenId = garden.id;
      break;
    }
    default:
      break;
    }
  }
};
