import initialState from '../InitialState';
import ActionTypes from '../../actions/ActionTypes';

export default function (state = initialState.user, action) {
  switch (action.type) {
  case ActionTypes.FETCH_USER:
    return action;
  case ActionTypes.RECEIVE_USER:
    return action.user;
  default:
    return state;
  }
}
