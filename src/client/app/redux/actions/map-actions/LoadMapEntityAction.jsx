import superagent from 'superagent';
import ActionTypes from '../ActionTypes';
import { apiEndpoints } from '../../../utils/Constants';

import MarkerWithInfo from '../../../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../../../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../../../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../../../components/map/user-marker/UserMarker';
import FarmMarker from '../../../components/map/farm-marker/FarmMarker';


function getMarkerByType(type) {
  switch (type) {
  case 'Garden':
    return UserMarker;
  case 'Farm':
    return FarmMarker;
  case 'FoodShop':
    return StoreMarker;
  case 'ToolShop':
    return GardenToolsMarker;
  default:
    return MarkerWithInfo;
  }
}

export function receiveEntities(mapEntities) {
  console.log('receive entities');

  mapEntities.forEach((entity) => {
    entity.marker = getMarkerByType(entity.type);
    if (entity.type === 'Garden') {
      entity.picture = `https://graph.facebook.com/${entity.socials.fb}/picture?type=square&width=200&height=200`;
      // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
    }
  });

  const places = mapEntities.map(mapEntity => mapEntity.position);
  if (places.length > 0) places.push(places[0]);

  mapEntities.places = places;

  return { type: ActionTypes.RECEIVE_ENTITIES, mapEntities };
}

export function fetchEntities() {
  return (dispatch) => {
    console.log('fetch entities');
    superagent.get(`${apiEndpoints.map.entities.LIST}?sort=[["_id", 1]]`).withCredentials()
      .then((res) => {
        const mapEntities = (res.body ? res.body.data.entities || [] : []);
        dispatch(receiveEntities(mapEntities));
      });
  };
}
