/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');
// const GardenService = require('../../services/garden');

module.exports = class Garden2MobileHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.garden2Mobile, this.handleGardenToMobile.bind(this));
    return this;
  }

  async handleGardenToMobile(socket, type, message) {
    debug(colors.green('[Garden]'), WS_EVENTS.garden2Mobile, message);
    switch (type) {
    default:
      break;
    }
  }
};
