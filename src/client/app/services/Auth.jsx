import superagent from 'superagent';
import { ApiEndpoints } from '../utils/Constants';
import FbService from './FbService';
import UserService from './UserService';

export default class Auth {
  static async init() {
    await FbService.init();
    await this.checkLoginStatus();
  }

  static async checkLoginStatus() {
    await FbService.fetchLoginStatus(); // For Access_Token
    await Promise.all([
      FbService.fetchProfile(), // For name, email, age...
      UserService.fetchUser() // For permissions
    ]);
  }

  static async fbLogin() {
    const isOk = await FbService.login();
    await Promise.all([
      FbService.fetchProfile(),
      UserService.fetchUser()
    ]);
    return isOk;
  }

  static signin(email, password) {
    return superagent.post(ApiEndpoints.user.SIGN_IN).withCredentials()
      .send({ email, password });
  }

  static async logout() {
    await Promise.all([
      FbService.logout(),
      UserService.logout()
    ]);
  }
}
