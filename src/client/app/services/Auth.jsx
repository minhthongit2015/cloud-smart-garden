import APICaller from './APICaller';
import { API_END_POINTS } from '../utils/Constants';

export default class Auth {
  static signin(username, password) {
    APICaller.post(API_END_POINTS.signin, { username, password });
  }
}
