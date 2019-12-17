/* eslint-disable no-param-reassign */
import React from 'react';
import BasePage from '../_base/BasePage';

import GGMap from '../../components/map/Map';
import Polyline from '../../components/map/polyline/Polyline';
import MapService from '../../services/MapService';
import t from '../../languages';
import LeftToolBar from '../../components/map-tools/left-toolbar/LeftToolBar';
import UserService from '../../services/UserService';
import RightToolBar from '../../components/map-tools/right-toolbar/RightToolBar';
import RightClickContextMenu from './RightClickContextMenu';
import MapUtils from '../../utils/MapUtils';
import LoginDialogService from '../../services/LoginDialogService';
// import CategoryService from '../../services/CategoryService';


export default class TheRealWorld extends BasePage {
  constructor(props) {
    super(props, t('pages.theRealWorld.title'));
    this.markers = new Set();
    this.mapRef = React.createRef();
    this.lineRef = React.createRef();
    this.mapCtxMenuRef = React.createRef();
    this.rightToolbarRef = React.createRef();
    this.onMapReady = this.onMapReady.bind(this);
    this.onMarkerRef = this.onMarkerRef.bind(this);
    this.renderMapElements = this.renderMapElements.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMoveMarker = this.onMoveMarker.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.handleLeftToolbarAction = this.handleLeftToolbarAction.bind(this);
    this.handleRightToolbarAction = this.handleRightToolbarAction.bind(this);

    this.state = {
      dirty: false,
      mapEntities: [],
      places: []
    };
    const center = [15.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      // zoom: 17
      zoom: 5
    };

    UserService.useUserState(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dirty) {
      nextState.dirty = false;
      return true;
    }
    return false;
  }

  onMapReady() {
    this.map.setMapTypeId(this.google.maps.MapTypeId.SATELLITE);
    this.map.setOptions({
      restriction: {
        latLngBounds: {
          north: 85.45, south: -85.45, west: -180, east: 180
        },
        strictBounds: true
      },
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: true,
      streetViewControl: true
    });
    this.fetchPlaces().then((places) => {
      // CategoryService.fetchCategories();
      MapService.checkOpenCurrentPlace(places);
    });
    window.map = this.map;
  }

  onMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
  }

  async fetchPlaces() {
    return new Promise(async (resolve) => {
      const places = await MapService.fetchPlaces();
      places.forEach((place) => {
        place.marker = MapUtils.getMarkerByType(place.__t);
      });
      this.setState({
        dirty: true,
        places
      }, () => resolve(places));
    });
  }

  refresh() {
    this.setState({ dirty: true });
  }

  onMapClicked(/* mapProps, map, event */) {
    // if (window.key.ctrl) {
    //   prompt('LatLng', `${event.latLng.lat()}, ${event.latLng.lng()}`);
    // }
    if (window.key.alt) {
      //
    }
    if (window.key.shift) {
      return this.fetchPlaces();
    }
    return this.closeAll();
  }

  closeAll() {
    this.markers.forEach(marker => marker && marker.close());
  }

  handleRightClick(mapProps, map, event) {
    const originEvent = Object.values(event).find(prop => prop instanceof Event);
    this.mapCtxMenuRef.current.open(originEvent, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

  handleContextActions(event, option, newPlace) {
    // const { ContextOptions } = RightClickContextMenu;
    if (newPlace) {
      if (!UserService.isLoggedIn) {
        LoginDialogService.show(t('components.loginDialog.loginToRiseYourVoice'));
        return;
      }
      const isActivist = newPlace.__t === 'Activist';
      if (!UserService.isModOrAdmin && !isActivist) {
        return;
      }
      const existedPlace = isActivist && this.state.places.find(
        place => place.__t === 'Activist'
          && (place.user || place.author)._id === UserService.user._id
      );
      const isForceNew = UserService.isModOrAdmin && window.key.ctrl;
      const isRaiseYourVoice = isActivist && existedPlace;
      if (isRaiseYourVoice && !isForceNew) {
        existedPlace.ref.moveTo(newPlace.position);
        MapService.updatePlace(existedPlace);
        return;
      }
      this.addPlace(newPlace);
    }
  }

  addPlace(newPlace) {
    const newMarker = {
      ...newPlace,
      marker: MapUtils.getMarkerByType(newPlace.__t)
    };
    this.setState(prevState => ({
      dirty: true,
      places: [newMarker, ...prevState.places]
    }));
    MapService.createPlace(newPlace)
      .then((res) => {
        if (!res || !res.data) {
          // rollback
        }
        Object.assign(newMarker, res.data);
        this.refresh();
      });
  }

  addPath(newPath) {
    return new Promise((resolve) => {
      const newMarker = {
        ...newPath,
        marker: MapUtils.getMarkerByType(newPath.__t)
      };
      this.setState(prevState => ({
        dirty: true,
        places: [newMarker, ...prevState.places]
      }), resolve);
    });
  }

  removePath(userId, placeId) {
    return new Promise((resolve) => {
      const pathEntity = this.state.places.find(
        place => place.__t === 'Path'
          && place.user && place.user._id === userId
          && place.target && place.target._id === placeId
      );
      if (!pathEntity) {
        return;
      }
      this.setState(prevState => ({
        dirty: true,
        places: prevState.places.filter(place => place._id !== pathEntity._id)
      }), resolve);
    });
  }

  handleHotkeys(event) {
    let shouldPrevent = 9999;
    if (event.key === 'Tab') {
      if (window.key.shift) {
        shouldPrevent = this.switchMarker();
      } else {
        shouldPrevent = this.rightToolbarRef.current.toggle();
      }
    }
    if (shouldPrevent !== 9999) {
      event.preventDefault();
    }
  }

  switchMarker() {
    const markers = [...this.markers];
    const focusedMarkerIndex = markers.findIndex(marker => marker.marker.isFocused);
    if (focusedMarkerIndex >= 0) {
      for (let i = focusedMarkerIndex + 1; (i % markers.length) !== focusedMarkerIndex; i++) {
        if (markers[i % markers.length].marker.isOpen) {
          markers[i % markers.length].marker.focus();
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleLeftToolbarAction(event) {
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
  handleRightToolbarAction(event, place) {
    this.closeAll();
    if (place.zoom) {
      place.ref.zoomTo();
    } else {
      place.ref.open();
    }
    this.mapRef.current.refs.map.focus();
  }

  // eslint-disable-next-line class-methods-use-this
  onMoveMarker(markerProps, map, event, place) {
    if (!window.confirm('Xác nhận di chuyển địa điểm này?')) {
      place.ref.moveTo();
      event.stop();
      return;
    }
    place.position = event.latLng.toJSON();
    MapService.updatePlace(place);
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    const { places } = this.state;

    return (
      <React.Fragment>
        {places.map((place) => {
          if (place.marker && place.__t !== 'Path') {
            return (
              <place.marker
                {...baseProps}
                mainMap={this}
                key={place._id || Math.random()}
                ref={(ref) => { this.onMarkerRef(ref); place.ref = ref; }}
                entity={place}
                markerProps={{
                  name: place.name,
                  position: place.position,
                  radius: place.radius,
                  draggable: UserService.isModOrAdmin,
                  onDragend: (markerProps, mapz, event) => {
                    this.onMoveMarker(markerProps, mapz, event, place);
                  }
                }}
                windowProps={{}}
                name={place.name}
              />
            );
          }
          if (place.__t === 'Path') {
            return (
              <Polyline
                {...baseProps}
                mainMap={this}
                key={place._id || Math.random()}
                path={place.path}
                opacity={0.8}
                width={2}
                {...MapUtils.getPathStyleByType(place.type)}
              />
            );
          }
          return null;
        })}
      </React.Fragment>
    );
  }

  render() {
    console.log('render "Pages/the-real-world/TheRealWorld.jsx"');
    const { places } = this.state;

    // if (!window.myGoogleMap) {
    window.myGoogleMap = (
      <GGMap
        ref={this.mapRef}
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onRightclick={this.handleRightClick}
        onReady={this.onMapReady}
        dirty={this.state.dirty}
      >
        <this.renderMapElements />
        {false && <LeftToolBar handler={this.handleLeftToolbarAction} />}
        <RightToolBar
          ref={this.rightToolbarRef}
          handler={this.handleRightToolbarAction}
          places={places}
        />
        <RightClickContextMenu
          ref={this.mapCtxMenuRef}
          handler={this.handleContextActions}
          mainMap={this}
        />
      </GGMap>
    );
    // }

    return (
      <div {...this.props} onKeyDown={this.handleHotkeys}>
        {window.myGoogleMap}
      </div>
    );
  }
}
