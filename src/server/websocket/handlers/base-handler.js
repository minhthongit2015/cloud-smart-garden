

module.exports = class WebsocketHandler {
  constructor(event) {
    this.events = [];
    if (event) {
      this.events.push(event);
    }
    this.callbacks = [];
  }

  setup(io, clients, manager) {
    this.io = io;
    this.clients = clients;
    this.manager = manager;
    return this;
  }

  addEvent(event) {
    this.events.push(event);
  }

  addListener(callback) {
    this.callbacks.push(callback);
  }

  _dispatchEvent(...args) {
    this.callbacks.map(callback => callback(...args));
  }
  
  attach(socket) {
    this.events.map(event => socket.on(event, (...args) => this._dispatchEvent(socket, ...args)));
  }
};
