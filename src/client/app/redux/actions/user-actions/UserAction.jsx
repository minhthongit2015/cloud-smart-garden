import superagent from 'superagent';
import ActionTypes from '../ActionTypes';

import { apiEndpoints } from '../../../utils/Constants';

export function receiveUser(json) {
  return { type: ActionTypes.RECEIVE_USER, user: json.user };
}

export function fetchUser() {
  return (dispatch) => {
    const storedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    dispatch(receiveUser({ user: storedUser }));
  };
}

export function clearUser() {
  return (dispatch) => {
    localStorage.removeItem('user');
    superagent.get(apiEndpoints.user.SIGN_OUT).withCredentials().end();
    dispatch(receiveUser({ user: {} }));
  };
}

export function saveUser(user) {
  return (dispatch) => {
    if (user) {
      try {
        const userJSON = JSON.stringify(user);
        localStorage.setItem('user', userJSON);
        dispatch(receiveUser({ user }));
      } catch (error) {
        //
      }
    }
  };
}
