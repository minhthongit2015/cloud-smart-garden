
import io from 'socket.io-client';
import path from 'path';
import Config from '../config';

export default class SuperWebsocket {
  static get on() {
    if (!this._on) {
      this._on = this.socket.on.bind(this.socket);
    }
    return this._on;
  }

  static get connected() { return this.socket.connected; }

  static init() {
    this.socket = io(Config.wsEndpoint, {
      transports: ['websocket']
    });
    this.socket.on('connect', () => {
      // console.highlight(' >>>  Fast Connection is Established!  🚀');
      console.badge(' >>>  Ultra Connection is Established!  🚀');
    });
    this.socket.on('disconnect', () => {
      console.warn('Warning: Ultra Connection is interrupted!');
    });
  }

  static async emit(...args) {
    if (!this.connected) {
      return Promise.reject(new Error('Connection Error: Lost connection!'));
    }
    return new Promise((resolve, reject) => {
      this.socket.emit(...args, (res) => {
        if (!res || res.ok === false) {
          return reject(res && res.error);
        }
        return resolve(res);
      });
    });
  }

  static async ws(eventPath, body = {}, headers) {
    eventPath = eventPath.replace(/https?.+?(\w|\.|:)+?\//g, '');
    return this.emit(eventPath, { ...body, headers });
  }

  static async get(eventPath, headers) {
    return this.ws(path.join('GET', eventPath.toString()), undefined, headers);
  }

  static async post(eventPath, body, headers) {
    return this.ws(path.join('POST', eventPath.toString()), body, headers);
  }

  static async put(eventPath, body, headers) {
    return this.ws(path.join('PUT', eventPath.toString()), body, headers);
  }

  static async patch(eventPath, body, headers) {
    return this.ws(path.join('PATCH', eventPath.toString()), body, headers);
  }

  static async delete(eventPath, headers) {
    return this.ws(path.join('DELETE', eventPath.toString()), undefined, headers);
  }
}
