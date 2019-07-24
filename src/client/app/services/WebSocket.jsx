
import io from 'socket.io-client';
import { WS_EVENTS } from '../utils/Constants';
import ClientConfig from '../config';

export default class Connection {
  static get socket() { return this._socket; }

  static get on() { return this._socket.on; }

  static setup() {
    // eslint-disable-next-line no-undef
    this._socket = io(ClientConfig.currentConfig.wsEndPoint, {
      transports: ['websocket']
    });
    this._socket.on(WS_EVENTS.cloudConnect, async () => {
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
