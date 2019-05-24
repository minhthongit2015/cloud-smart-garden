/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');
// const GardenService = require('../../services/garden');

module.exports = class Garden2MobileHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.garden2Mobile);
    this.addListener(this.handleGardenToMobile.bind(this));
  }

  async handleGardenToMobile(socket, type, message) {
    debug(colors.green('[Garden]'), WS_EVENTS.garden2Mobile, message);
    switch (type) {
    default:
      break;
    }
  }
};
