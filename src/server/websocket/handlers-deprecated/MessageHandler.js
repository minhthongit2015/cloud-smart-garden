
const BaseHandler = require('./BaseHandler');
const { WS_EVENTS } = require('../../../shared/constants');

module.exports = class MessageHandler extends BaseHandler {
  setup(io, clients, manager) {
    super.setup(io, clients, manager);
    this.addListener(WS_EVENTS.message, this.handleMessage.bind(this));
  }

  handleMessage(socket, message, res) {
    console.log(message, this);
    if (res) res(message);
  }
};
