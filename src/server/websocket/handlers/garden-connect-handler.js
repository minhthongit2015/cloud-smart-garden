/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
const GardenService = require('../../services/garden');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.gardenConnect);
    this.addListener(this.handleGardenConnect.bind(this));
  }

  async handleGardenConnect(socket, message, res) {
    console.log(WS_EVENTS.gardenConnect, message);
    if (!message || !message.physicalAddress) {
      return socket.disconnect();
    }
    const garden = await GardenService.getGardenByPhysicalAddress(message.physicalAddress);
    if (!garden || !message.secretKey|| !message.secretKey.includes('Sec_')) {
      return !res ? null : res('Connection Denied!');
    }
    if (garden.local_ip !== message.localIP) {
      garden.local_ip = message.localIP;
      GardenService.updateLocalIP(message.localIP);
    }
    socket.gardenPhysicalAddress = message.physicalAddress;
    socket.type = 'garden';
    socket.gardenId = garden.id;
    socket.garden = garden;
    return !res ? null : res(true);
  }
};
