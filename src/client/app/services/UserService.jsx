
import superrequest from '../utils/superrequest';
import { apiEndpoints } from '../utils/Constants';

export default class UserService {
  static signIn(username, password) {
    return superrequest.post(apiEndpoints.user.SIGN_IN, {
      username,
      password
    });
  }

  static loadUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return {};
    }
  }

  static saveUser(user) {
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        //
      }
    }
  }

  static clearUser() {
    localStorage.removeItem('user');
    return superrequest.get(apiEndpoints.user.SIGN_OUT);
  }
}
