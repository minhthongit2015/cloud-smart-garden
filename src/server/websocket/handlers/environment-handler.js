/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');

module.exports = class EnvironmentHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addEvent(WS_EVENTS.environment);
    this.addListener(this.handleEnvironment.bind(this));
  }

  async handleEnvironment(socket, message) {
    debug(colors.green('[Garden]'), WS_EVENTS.environment, message.stationId);
  }
};
