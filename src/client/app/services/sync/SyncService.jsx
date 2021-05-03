import React from 'react';
import superrequest from '../../utils/superrequest';


export default class {
  static registeredListenerMap = {};

  static getListener(listenerId) {
    return this.registeredListenerMap[listenerId];
  }

  static removeListener(listenerId) {
    if (!listenerId) {
      return;
    }
    const lisnter = this.getListener(listenerId);
    if (!lisnter) {
      return;
    }
    const { event, callback } = lisnter;
    superrequest.removeListener(event, callback);
  }

  static useEvent(event, callback) {
    React.useEffect(() => {
      this.on(event, callback);
      return () => superrequest.removeListener(event, callback);
    }, []);
  }

  static on(event, callback, prevListenerId) {
    this.removeListener(prevListenerId);
    superrequest.on(event, callback);
    const _listenerId = prevListenerId || Date.now();
    this.registeredListenerMap[_listenerId] = { event, callback };
    return _listenerId;
  }
}
