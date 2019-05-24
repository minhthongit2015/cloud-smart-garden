
import { WS_EVENTS } from '../../shared/constants';
import ClientConfig from '../../config/client';

export default class Connection {
  static setup() {
    // eslint-disable-next-line no-undef
    Connection.socket = io(`http://localhost:${ClientConfig.backendPort}`);
    Connection.socket.on(WS_EVENTS.cloudConnect, () => {
      console.log('connected');
    });
  }
}
