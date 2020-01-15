import superrequest from '../../utils/superrequest';
import UserService from '../user/UserService';
import ApiEndpoints from '../../utils/ApiEndpoints';
import FbService from '../user/FbService';


export default class MapService {
  static async fetchPlace(placeOrder) {
    if (!placeOrder) return null;
    return superrequest.get(ApiEndpoints.placeOrderI(placeOrder));
  }

  static extractPlaceOrder(url) {
    if (!url) return null;
    if (!Number.isNaN(+url)) return url;
    const urlz = new URL(url || window.location.href);
    return urlz.searchParams.get('place');
  }

  static async fetchPlaces() {
    return superrequest.get(ApiEndpoints.placesSorted)
      .then((res) => {
        if (!res || !res.data) {
          return [];
        }
        const places = res.data || [];
        return this.mapEntities(places);
      });
  }

  static async updateOrCreatePlace(place) {
    const { marker, ref, ...placeToUpdate } = place;
    return superrequest.agentPost(ApiEndpoints.places, placeToUpdate);
  }

  static async deletePlace(place) {
    return superrequest.agentDelete(ApiEndpoints.placeI(place._id));
  }

  static mapEntities(places) {
    const paths = [];
    places.forEach((place) => {
      if (place.__t === 'Strike') {
        place.prev = places.find(pl => pl._id === place.prev);
        place.next = places.find(pl => pl._id === place.next);
        if (UserService.isLoggedIn) {
          place.joined = place.members.some(member => member._id === UserService.user._id);
        }
      }
      if (place.__t === 'Garden') {
        place.picture = FbService.buildAvatarUrl(place.socials.fb);
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    places.filter(place => place.__t === 'Strike')
      .forEach((place, i, arr) => {
        if (place.next && arr.every(pl => !pl.next || pl.next._id !== place._id)) {
          const strikePathEntity = this.generateStrikeRoutePath(place);
          paths.push(strikePathEntity);
        }
        if (place.members) {
          place.members.forEach((member) => {
            const strikerPath = this.generateStrikerPath(places, member._id, place);
            if (strikerPath) {
              paths.push(strikerPath);
            }
          });
        }
      });
    return [...places, ...paths];
  }

  static generateStrikeRoutePath(place) {
    const strikePathEntity = this.generatePathEntity(place);
    strikePathEntity.path = this.getPathFromStart(place);
    strikePathEntity.type = 'Strike';
    return strikePathEntity;
  }

  static generateStrikerPath(places, userId, place) {
    const userMarker = places.find(
      placez => placez.__t === 'Activist' && (placez.user || placez.author)._id === userId
    );
    if (!userMarker) {
      return null;
    }
    const memberPathEntity = this.generatePathEntity(place);
    memberPathEntity.path = [userMarker.position, place.position];
    memberPathEntity.type = 'Activist-Strike';
    memberPathEntity.user = userMarker.user || userMarker.author;
    memberPathEntity.target = place;
    return memberPathEntity;
  }

  static generatePathEntity(place) {
    return {
      _id: `${place && place._id}${Math.round(Math.random() * 10000000)}`,
      __t: 'Path',
      type: 'Path',
      name: place && place.name,
      path: []
    };
  }

  static getPathFromStart(startPlace) {
    const path = [];
    let prev;
    while (startPlace) {
      startPlace.prev = prev;
      path.push(startPlace.position);
      prev = startPlace;
      startPlace = startPlace.next;
    }
    return path;
  }

  static openPlace(place) {
    if (!place) return;
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = urlParams.get('place');
    const {
      protocol, host, pathname, hash
    } = window.location;
    const url = `${protocol}//${host}${pathname}?place=${place.baseOrder}${hash}`;
    if (placeOrder) {
      window.history.replaceState({ placeOrder: place.baseOrder }, place.name, url);
    } else {
      this.pushState = true;
      window.history.pushState({ placeOrder: place.baseOrder }, place.name, url);
    }
  }

  static closePlace() {
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = urlParams.get('place');
    if (!placeOrder || Date.now() - this.lastClose < 500) {
      return;
    }
    const {
      protocol, host, pathname, hash
    } = window.location;
    const url = `${protocol}//${host}${pathname}${hash}`;
    if (this.pushState) {
      window.history.back();
    } else {
      window.history.pushState(null, 'Smile City | Beyond Garden', url);
    }
    this.lastClose = Date.now();
  }

  static checkOpenCurrentPlace(places) {
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = +urlParams.get('place');
    if (placeOrder) {
      const selectedPlace = places.find(place => place.baseOrder === placeOrder);
      if (selectedPlace) {
        if (selectedPlace.zoom != null && selectedPlace.zoom !== '') {
          selectedPlace.ref.zoomTo();
        }
        selectedPlace.ref.open();
      }
    }
  }

  static async joinStrike(strike) {
    return superrequest.agentPost(`/api/v1/map/strikes/join/${strike._id}`);
  }

  static async leaveStrike(strike) {
    return superrequest.agentPost(`/api/v1/map/strikes/leave/${strike._id}`);
  }
}
