import ActionTypes from '../ActionTypes';

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
    dispatch(receiveUser({ user: {} }));
  };
}
