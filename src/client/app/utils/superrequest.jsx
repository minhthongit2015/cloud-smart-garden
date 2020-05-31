
import superagent from 'superagent';
import superagentRx from 'superagent-rx';
import superws from './superws';
import Config from '../config';

superagentRx(superagent);

export default class {
  static resolveAgentResponse(agent) {
    return agent
      .catch((res) => {
        const { body: { error } = {} } = res.response;
        if (!error) {
          throw new Error('Kết nối đến máy chủ bị gián đoạn. Mời bạn vui lòng thử lại sau ít phút.');
        } else {
          const newError = new Error(error.message);
          Object.assign(newError, error);
          throw newError;
        }
      })
      .then((agentRes) => {
        if (!agentRes.body || agentRes.body.ok === false) {
          throw new Error(agentRes.body && agentRes.body.error);
        }
        return agentRes.body;
      });
  }

  static mapUrl(url) {
    url = url.toString();
    if (url.startsWith('/')) {
      return `${Config.httpEndpoint}${url}`;
    }
    return url;
  }

  static setAccessToken(token) {
    this._accessToken = token;
  }

  static get accessToken() {
    return this._accessToken;
  }

  static get baseHeaders() {
    return { AccessToken: this.accessToken };
  }

  static get ws() { return superws; }

  static get agent() { return superagent; }

  static async emit(...args) {
    return superws.emit(...args);
  }

  static async on(event, callback) {
    return superws.on(event, callback);
  }

  static async removeListener(event, listener) {
    return superws.socket.removeListener(event, listener);
  }

  static async removeAllListeners() {
    return superws.socket.removeAllListeners();
  }

  static async get(url) {
    if (superws.connected) return superws.get(url, this.baseHeaders);
    return this.agentGet(url);
  }

  static async agentGet(url) {
    return this.resolveAgentResponse(
      superagent.get(this.mapUrl(url)).withCredentials()
        .set('AccessToken', this.accessToken)
    );
  }

  static observeGet(url) {
    return superagent.get(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken)
      .observe();
  }

  static async post(url, body) {
    if (superws.connected) return superws.post(url, body, this.baseHeaders);
    return this.agentPost(url, body);
  }

  static async agentPost(url, body) {
    return this.resolveAgentResponse(
      superagent.post(this.mapUrl(url)).withCredentials()
        .set('AccessToken', this.accessToken).send(body)
    );
  }

  static async put(url, body) {
    if (superws.connected) return superws.put(url, body, this.baseHeaders);
    return this.agentPut(url, body);
  }

  static async agentPut(url, body) {
    return this.resolveAgentResponse(
      superagent.put(this.mapUrl(url)).withCredentials()
        .set('AccessToken', this.accessToken).send(body)
    );
  }

  static async patch(url, body) {
    if (superws.connected) return superws.patch(url, body, this.baseHeaders);
    return this.agentPatch(url, body);
  }

  static async agentPatch(url, body) {
    return this.resolveAgentResponse(
      superagent.patch(this.mapUrl(url)).withCredentials()
        .set('AccessToken', this.accessToken).send(body)
    );
  }

  static async delete(url, body) {
    if (superws.connected) return superws.delete(url, body, this.baseHeaders);
    return this.agentDelete(url, body);
  }

  static async agentDelete(url, body) {
    return this.resolveAgentResponse(
      superagent.delete(this.mapUrl(url)).withCredentials()
        .set('AccessToken', this.accessToken).send(body)
    );
  }
}
