
import superagent from 'superagent';
import superws from './superws';

export default class {
  static get ws() { return superws; }

  static get agent() { return superagent; }

  static async emit(...args) {
    if (superws.connected) return this.socket.emit(...args);
    return null;
  }

  static async get(url) {
    if (superws.connected) return superws.get(url);
    return superagent.get(url).withCredentials().then(res => res.body);
  }

  static async post(url, body) {
    if (superws.connected) return superws.post(url, body);
    return superagent.post(url).withCredentials().send(body);
  }

  static async put(url, body) {
    if (superws.connected) return superws.put(url, body);
    return superagent.put(url).withCredentials().send(body);
  }

  static async delete(url) {
    if (superws.connected) return superws.delete(url);
    return superagent.delete(url).withCredentials().then(res => res.body);
  }
}
