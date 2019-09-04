
import superagent from 'superagent';
import superws from './superws';

export default class {
  static async get(url) {
    if (superws.connected) return superws.get(url);
    return superagent.get(url).withCredentials().then(res => res.body);
  }

  static async post(url, body) {
    if (superws.connected) return superws.post(url, body);
    return superagent.get(url).withCredentials().send(body);
  }
}
