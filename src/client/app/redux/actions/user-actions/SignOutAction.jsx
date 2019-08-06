import ActionTypes from '../ActionTypes';

export function receiveUser(json) {
  return { type: ActionTypes.RECEIVE_USER, user: null };
}

export function fetchUser() {
  return (dispatch) => {
    const storedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    dispatch(receiveUser({ user: storedUser }));
  };
}
