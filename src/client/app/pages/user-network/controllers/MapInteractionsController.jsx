import BaseComponent from '../../../components/BaseComponent';
import MapService from '../../../services/map/MapService';
import BaseMapController from './BaseMapController';


export default class extends BaseMapController {
  static init(userNetwork) {
    super.init(userNetwork);
    BaseComponent.bindMethods(this,
      this.handleMapClick, this.handleRightClick, this.handleHotkeys,
      this.handleOpenMarker, this.handleCloseMarker,
      this.handleOpenPanel, this.handleClosePanel, this.handleClickPanel);
    this.openedMarkers = [];
    this.openedPanels = [];
    this.focusedPlaceIndex = -1;
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

  static handleOpenPanel(event, panelRef) {
    this.openedPanels.forEach(openedPanelRef => openedPanelRef.unfocus());
    this.openedPanels.push(panelRef);
  }

  static handleClosePanel(event, panelRef) {
    const panelIndex = this.openedPanels.findIndex(openedPanelRef => openedPanelRef === panelRef);
    if (panelIndex >= 0) {
      this.openedPanels.splice(panelIndex, 1);
    }
  }

  static handleClickPanel(event, panelRef) {
    this.openedPanels.forEach(openedPanelRef => openedPanelRef.unfocus());
    panelRef.focus();
  }
}
