const { isNone, isString, isFunction } = require('./utils');

module.exports = class Listenable {
  constructor() {
    this.listeners = {};
  }

  addEventListener(event, callback, opts = {}) {
    if (!isString(event) || !isFunction(callback)) return;
    if (!this.listeners[event]) this.listeners[event] = [];
    if (!this.listeners[event].includes(callback)) {
      this.listeners[event].push(callback);
    }
  }

  // removeEventListener(event, opts={}) {
  //   if (isString(opts)) return;
  // }

  dispatchEvent(event) {
    if (isString(event)) event = { type: event };
    if (
      isNone(event) ||
      !isString(event.type) ||
      isNone(this.listeners[event.type])
    )
      return;
    this.listeners[event.type].forEach(callback => {
      callback(event);
    });
  }

  ready(callback, opts = {}) {
    if (this.ready) callback({ type: 'ready' });
    else this.addEventListener('ready', callback, opts);
  }

  callReady(event) {
    if (event) {
      event.type = 'ready';
    } else {
      event = {};
    }
    this.dispatchEvent(event);
  }
};
