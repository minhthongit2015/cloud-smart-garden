import initialState from '../InitialState';
import ActionTypes from '../../actions/ActionTypes';

export default function (state = initialState.mapEntities, action) {
  console.log('Map Entity reducer', state, action);
  switch (action.type) {
  case ActionTypes.FETCH_ENTITIES:
    console.log('Fetch Entities Action', action);
    return action;
  case ActionTypes.RECEIVE_ENTITIES:
    return action.mapEntities;
  default:
    return state;
  }
}
