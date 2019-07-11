/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const colors = require('colors/safe');
const debug = require('debug')('app:server');
const BaseHandler = require('../BaseHandler');
const { WS_EVENTS } = require('../../../../shared/constants');

module.exports = class Garden2CloudHandler extends BaseHandler {
  setup(manager) {
    super.setup(manager);
    this.addListener(WS_EVENTS.garden2Cloud, this.handleGardenToCloud.bind(this));
    return this;
  }

  async handleGardenToCloud(socket, type, message) {
    debug(colors.green('[Garden]'), WS_EVENTS.garden2Cloud, message);
    switch (type) {
    default:
      return null;
    }
  }
};
