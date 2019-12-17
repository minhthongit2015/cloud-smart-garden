import superagent from 'superagent';
import { apiEndpoints } from '../utils/Constants';

export default class Auth {
  static signin(username, password) {
    return superagent.post(apiEndpoints.user.SIGN_IN).withCredentials()
      .send({ username, password });
  }
}
