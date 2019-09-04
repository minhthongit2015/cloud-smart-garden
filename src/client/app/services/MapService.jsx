
import superagent from 'superagent';
import superws from '../utils/superws';
import { apiEndpoints } from '../utils/Constants';

import MarkerWithInfo from '../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../components/map/user-marker/UserMarker';
import FarmMarker from '../components/map/farm-marker/FarmMarker';

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

export default class MapService {
  static fetchEntities() {
    let requestPromise;
    const endpoint = `${apiEndpoints.map.entities.LIST}?sort=[["_id", 1]]`;
    if (superws.connected) {
      requestPromise = superws.get(endpoint);
    } else {
      requestPromise = superagent.get(endpoint).withCredentials().then(res => res.body);
    }
    return requestPromise
      .then((res) => {
        const mapEntities = (res.data && res.data.entities) || [];
        return this.mapEntities(mapEntities);
      });
  }

  static mapEntities(mapEntities) {
    mapEntities.forEach((entity) => {
      entity.marker = getMarkerByType(entity.type);
      if (entity.type === 'Garden') {
        entity.picture = `https://graph.facebook.com/${entity.socials.fb}`
          + '/picture?type=square&width=200&height=200';
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    const places = mapEntities.map(mapEntity => mapEntity.position);
    if (places.length > 0) places.push(places[0]);
    mapEntities.places = places;
    return mapEntities;
  }
}
