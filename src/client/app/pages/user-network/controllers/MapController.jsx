import UserService from '../../../services/user/UserService';
import LoginDialogHelper from '../../../helpers/dialogs/LoginDialogHelper';
import t from '../../../languages';
import MapService from '../../../services/map/MapService';
import MapUtils from '../../../utils/MapUtils';
import BaseComponent from '../../../components/BaseComponent';


export default class {
  static userNetwork;

  static init(userNetwork) {
    this.userNetwork = userNetwork;
    BaseComponent.bindMethods(this,
      this.handleMapClick, this.handleRightClick, this.handleHotkeys,
      this.handleOpenMarker, this.handleCloseMarker, this.handleMoveMarker,
      this.handleContextActions,
      this.handleLeftToolbarAction, this.handleRightToolbarAction);
    this.openedMarkers = [];
    this.focusedPlaceIndex = -1;
  }

  static get places() {
    return this.userNetwork.state.places;
  }

  static get markers() {
    return this.userNetwork.markers;
  }

  static handleMapClick(/* mapProps, map, event */) {
    // if (window.key.ctrl) {
    //   prompt('LatLng', `${event.latLng.lat()}, ${event.latLng.lng()}`);
    // }
    if (window.key.alt) {
      //
    }
    if (window.key.shift) {
      return this.userNetwork.fetchPlaces();
    }
    this.openedMarkers = [];
    return this.userNetwork.closeAll();
  }

  static handleRightClick(mapProps, map, event) {
    const originEvent = Object.values(event).find(prop => prop instanceof Event);
    this.userNetwork.mapCtxMenuRef.current.open(originEvent, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

  static handleHotkeys(event) {
    let shouldPrevent = 9999;
    if (event.key === 'Tab') {
      event.preventDefault();
      if (window.key.shift) {
        shouldPrevent = this.userNetwork.rightToolbarRef.current.toggle();
      } else {
        shouldPrevent = this.switchMarker();
      }
    }
    if (shouldPrevent !== 9999) {
      event.preventDefault();
    }
  }

  static switchMarker() {
    const currentIndex = this.openedMarkers.findIndex(marker => marker.isFocused);
    if (!this.openedMarkers.length) {
      return;
    }
    const nextIndex = (currentIndex + 1) % this.openedMarkers.length;
    this.openedMarkers[nextIndex || 0].focus();
  }

  static handleOpenMarker(event, marker) {
    this.openedMarkers.push(marker);
    MapService.openPlace(marker.place);
  }

  static handleCloseMarker(event, marker) {
    const markerIndex = this.openedMarkers
      .findIndex(openedMarker => openedMarker.id === marker.id);
    if (markerIndex >= 0) {
      this.openedMarkers.splice(markerIndex, 1);
    }
    MapService.closePlace();
  }

  static handleMoveMarker(markerProps, map, event, place) {
    if (!window.confirm('Xác nhận di chuyển địa điểm này?')) {
      place.ref.moveTo();
      event.stop();
      return;
    }
    place.position = event.latLng.toJSON();
    MapService.updateOrCreatePlace(place);
  }

  static handleContextActions(event, option, newPlace) {
    // const { ContextOptions } = MapContextMenu;
    if (newPlace) {
      return this.createNewPlace(newPlace);
    }
    return null;
  }

  static createNewPlace(newPlace) {
    if (!newPlace) {
      return null;
    }
    if (!UserService.isLoggedIn) {
      return LoginDialogHelper.show(t('components.loginDialog.loginToRiseYourVoice'));
    }
    const newMarker = {
      ...newPlace,
      marker: MapUtils.getMarkerByType(newPlace.__t)
    };
    this.userNetwork.addMarker(newMarker);
    return MapService.updateOrCreatePlace(newPlace)
      .then((res) => {
        if (!res || !res.data) {
          // rollback
        }
        Object.assign(newMarker, res.data);
        this.refresh();
      });
  }

  static handleLeftToolbarAction(event) {
    const { name/* , value, checked */ } = event.currentTarget;
    switch (name) {
    case 'Activist':
      break;
    case 'Strike':
      break;
    case 'Extinction':
      break;
    case 'Disaster':
      break;
    case 'Pollution':
      break;
    case 'Community':
      break;
    default:
      break;
    }
    console.log(event);
  }

  // eslint-disable-next-line class-methods-use-this
  static handleRightToolbarAction(event, place) {
    this.userNetwork.closeAll();
    if (place.zoom) {
      place.ref.zoomTo();
    } else {
      place.ref.open();
    }
    this.userNetwork.mapRef.current.refs.map.focus();
  }
}
