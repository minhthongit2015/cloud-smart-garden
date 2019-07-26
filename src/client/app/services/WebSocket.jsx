
import io from 'socket.io-client';
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
      const rs = await this.ws('/garden/update/info', { msg: 'hello', secret: 123 });
      console.log(rs);
    });
  }

  static async ws(eventPath, data) {
    return new Promise((resolve) => {
      this.socket.emit(eventPath, data, res => resolve(res));
    });
  }
}
