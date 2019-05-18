

module.exports = class WebsocketEvent {
  constructor(type, dataOrMessage, dest, callback) {
    this.type = type;
    this.data = dataOrMessage;
    this.dest = dest;
    this.callback = callback;
  }

  get message() { return this.data; }
};
