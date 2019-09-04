
import io from 'socket.io-client';
import path from 'path';
import Config from '../config';

export default class LiveConnect {
  static get on() { return this.socket.on; }

  static get connected() { return this.socket.connected; }

  static setup() {
    this.socket = io(Config.currentConfig.wsEndpoint, {
      transports: ['websocket']
    });
    this.socket.on('connect', async () => {
      console.log('connected');
    });
  }

  static async ws(eventPath, body) {
    eventPath = eventPath.replace(/https?.+?(\w|\.|:)+?\//g, '');
    return new Promise((resolve) => {
      this.socket.emit(eventPath, body, res => resolve(res));
    });
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
