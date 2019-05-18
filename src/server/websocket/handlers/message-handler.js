
const BaseHandler = require('./base-handler');
const { WS_EVENTS } = require('../../../shared/constants');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients) {
    super.setup(io, clients);
    this.addEvent(WS_EVENTS.message);
    this.addListener(this.handleMessage);
  }

  handleMessage(socket, message, res) {
    console.log(message, this);
    if (res) res(message);
  }
};
