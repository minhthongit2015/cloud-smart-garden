/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');

module.exports = class EnvironmentHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.environment, this.handleEnvironment.bind(this));
    return this;
  }

  async handleEnvironment(socket, message) {
    debug(colors.green('[Garden]'), WS_EVENTS.environment, message.stationId);
    this.manager.clientArray.forEach((client) => {
      if (!client.gardenId) {
        client.emit(WS_EVENTS.environment, message);
      }
    });
  }
};
