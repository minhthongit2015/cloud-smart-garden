import superrequest from '../../utils/superrequest';
import UserService from '../user/UserService';
import FbService from '../user/FbService';
import MapGenerator from './MapGenerator';
import SocialService from '../social/SocialService';
import { MarkerTypes } from '../../utils/Constants';
import ApiEndpoints from '../../utils/ApiEndpoints';
import RouteConstants from '../../utils/RouteConstants';


export default class MapService extends SocialService {
  static get model() {
    return MarkerTypes.place;
  }

  static get getEndpoint() {
    return ApiEndpoints.places;
  }

  static list(...args) {
    return super.list(...args)
      .then((res) => {
        if (!res || !res.data) {
          return [];
        }
        const places = res.data || [];
        return this.mapEntities(places);
      });
  }

  static extractPlaceOrder(url = window.location.href) {
    if (!url) return null;
    if (!Number.isNaN(+url)) return url;
    const urlz = new URL(url || window.location.href);
    return urlz.searchParams.has('place')
      ? +urlz.searchParams.get('place')
      : null;
  }

  static async update(place) {
    const { marker, ref, ...placeToUpdate } = place;
    return super.update(placeToUpdate, { model: this.model });
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
          const strikePathEntity = MapGenerator.generateStrikeRoutePath(place);
          paths.push(strikePathEntity);
        }
        if (place.members) {
          place.members.forEach((member) => {
            const strikerPath = MapGenerator.generateStrikerPath(places, member._id, place);
            if (strikerPath) {
              paths.push(strikerPath);
            }
          });
        }
      });
    return [...places, ...paths];
  }

  static openPlace(place) {
    if (!place || !this.isInUserNetworkPage) return;
    const currentPlaceOrder = this.extractPlaceOrder();
    const newPlaceUrl = this.buildPlaceUrl(place);
    if (currentPlaceOrder) {
      window.history.replaceState({ placeOrder: place.order }, place.title, newPlaceUrl);
    } else {
      this.pushState = true;
      window.history.pushState({ placeOrder: place.order }, place.title, newPlaceUrl);
    }
  }

  static closePlace() {
    const placeOrder = this.extractPlaceOrder();
    if (!placeOrder || Date.now() - this.lastClose < 500) {
      this.lastClose = Date.now();
      return;
    }
    const noPlaceUrl = this.buildPlaceUrl(null);
    if (this.pushState) {
      window.history.back();
    } else {
      window.history.pushState(null, 'Smile City | Beyond Garden', noPlaceUrl);
    }
    this.lastClose = Date.now();
  }

  static buildPlaceUrl(place) {
    const {
      protocol, host, pathname, hash
    } = window.location;
    return `${protocol}//${host}${pathname}${place ? `?place=${place.order}` : ''}${hash}`;
  }

  static checkOpenCurrentPlace(places) {
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = +urlParams.get('place');
    if (placeOrder) {
      const selectedPlace = places.find(place => place.order === placeOrder);
      if (selectedPlace) {
        if (selectedPlace.zoom != null && selectedPlace.zoom !== '') {
          selectedPlace.ref.zoomTo();
        }
        selectedPlace.ref.open();
      }
    }
  }

  static get isInUserNetworkPage() {
    return window.location.pathname.startsWith(RouteConstants.userNetworkLink);
  }

  static async joinStrike(strike) {
    return superrequest.agentPost(`/api/v1/map/strikes/join/${strike._id}`);
  }

  static async leaveStrike(strike) {
    return superrequest.agentPost(`/api/v1/map/strikes/leave/${strike._id}`);
  }
}
