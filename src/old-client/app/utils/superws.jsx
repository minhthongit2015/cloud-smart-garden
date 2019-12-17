
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

  static setup() {
    this.socket = io(Config.currentConfig.wsEndpoint, {
      transports: ['websocket']
    });
    this.socket.on('connect', () => {
      console.log('connected');
    });
  }

  static async emit(...args) {
    return new Promise((resolve) => {
      this.socket.emit(...args, res => resolve(res));
    });
  }

  static async ws(eventPath, body) {
    eventPath = eventPath.replace(/https?.+?(\w|\.|:)+?\//g, '');
    return this.emit(eventPath, body);
  }

  static async get(eventPath, body) {
    return this.ws(path.join('GET', eventPath), body);
  }

  static async post(eventPath, body) {
    return this.ws(path.join('POST', eventPath), body);
  }

  static async put(eventPath, body) {
    return this.ws(path.join('PUT', eventPath), body);
  }

  static async patch(eventPath, body) {
    return this.ws(path.join('PATCH', eventPath), body);
  }

  static async delete(eventPath, body) {
    return this.ws(path.join('DELETE', eventPath), body);
  }
}
