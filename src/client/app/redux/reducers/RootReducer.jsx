import { combineReducers } from 'redux';
import UserReducer from './user-reducers/UserReducer';
import MapEntityReducer from './map-reducers/MapEntityReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  mapEntities: MapEntityReducer
});

export default rootReducer;
