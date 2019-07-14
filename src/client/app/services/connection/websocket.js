
import { WS_EVENTS } from '../../../../shared/constants';
import ClientConfig from '../../config';

export default class Connection {
  static get socket() { return Connection._socket; }

  static setup() {
    // eslint-disable-next-line no-undef
    Connection._socket = io(ClientConfig.currentConfig.wsEndPoint, {
      transports: ['websocket']
    });
    Connection._socket.on(WS_EVENTS.cloudConnect, () => {
      console.log('connected');
    });
  }
}
