/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');
const GardenService = require('../../../services/deprecated-garden');

module.exports = class MessageHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.gardenConnect, this.handleGardenConnect.bind(this));
    return this;
  }

  async handleGardenConnect(message, socket, res) {
    debug(colors.green('[Garden]'), WS_EVENTS.gardenConnect, message.physicalAddress);
    if (!message || !message.physicalAddress) {
      return socket.disconnect();
    }
    const garden = await GardenService.getGardenByPhysicalAddress(message.physicalAddress);
    if (!garden || !message.secretKey || !message.secretKey.includes('Sec_')) {
      return !res ? null : res('Access Denied!');
    }
    if (garden.local_ip !== message.localIP) {
      garden.local_ip = message.localIP;
      GardenService.updateLocalIP(message.localIP);
    }
    socket.gardenPhysicalAddress = message.physicalAddress;
    socket.type = 'garden';
    socket.gardenId = garden.id;
    socket.garden = garden;
    return !res ? null : res('Accepted');
  }
};
