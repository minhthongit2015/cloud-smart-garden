
import io from 'socket.io-client';
import path from 'path';
import ClientConfig from '../config';

export default class Connection {
  static get on() { return this.socket.on; }

  static setup() {
    // eslint-disable-next-line no-undef
    this.socket = io(ClientConfig.currentConfig.wsEndPoint, {
      transports: ['websocket']
    });
    this.socket.on('connect', async () => {
      console.log('connected');
      const rs = await this.get('/gardens/equips?type=luxurious', { msg: 'hello', secret: 123 });
      console.log(rs);
    });
    this.socket.on('voice-call', () => {

    });
  }

  static async ws(eventPath, body) {
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
