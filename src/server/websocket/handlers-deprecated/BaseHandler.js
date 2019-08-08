const Events = require('events');

module.exports = class WebsocketHandler extends Events.EventEmitter {
  setup(manager) {
    this.manager = manager;
    return this;
  }
};
