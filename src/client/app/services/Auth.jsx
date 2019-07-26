import superagent from 'superagent';
import { API } from '../utils/Constants';

export default class Auth {
  static signin(username, password) {
    return superagent.post(API.signin)
      .send({ username, password });
  }
}
