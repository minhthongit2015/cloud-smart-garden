/* eslint-disable no-param-reassign */
import React from 'react';
import BasePage from '../_base/BasePage';

import GGMap from '../../components/map/Map';
import Polyline from '../../components/map/polyline/Polyline';
import MapService from '../../services/map/MapService';
import t from '../../languages';
import LeftToolBar from '../../components/map-tools/left-toolbar/LeftToolBar';
import UserService from '../../services/user/UserService';
import MapContextMenu from './utils/MapContextMenu';
import MapUtils from '../../utils/MapUtils';
import MapController from './controllers/MapController';
import RightToolbarPanel from './utils/RightToolbarPanel';


export default class TheRealWorld extends BasePage {
  constructor(props) {
    super(props, t('pages.userNetwork.title'));
    this.markers = new Set();
    this.mapRef = React.createRef();
    this.lineRef = React.createRef();
    this.mapCtxMenuRef = React.createRef();
    this.rightToolbarRef = React.createRef();

    this.bind(
      this.handleMapReady,
      this.handleHotkeys,
      this.handleMarkerRef,
      this.renderMapElements
    );

    MapController.init(this);

    this.state = {
      dirty: false,
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

  handleMapReady() {
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

  fetchPlaces() {
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

  handleMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
    ref.place.ref = ref;
  }

  refresh() {
    this.setState({ dirty: true });
  }

  closeAll() {
    this.markers.forEach(marker => marker && marker.close());
  }

  addMarker(newMarker) {
    this.setState(prevState => ({
      dirty: true,
      places: [newMarker, ...prevState.places]
    }));
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
        shouldPrevent = this.rightToolbarRef.current.toggle();
      } else {
        shouldPrevent = this.switchMarker();
      }
    }
    if (shouldPrevent !== 9999) {
      event.preventDefault();
    }
  }

  switchMarker() {
    const markers = [...this.markers];
    const focusedMarkerIndex = markers.findIndex(marker => marker.isFocused);
    if (focusedMarkerIndex >= 0) {
      for (let i = focusedMarkerIndex + 1; (i % markers.length) !== focusedMarkerIndex; i++) {
        if (markers[i % markers.length].isOpen) {
          markers[i % markers.length].focus();
        }
      }
    }
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
                key={place._id || Math.random()}
                google={google}
                map={map}
                mainMap={this}
                ref={this.handleMarkerRef}
                place={place}
                markerProps={{}}
                circleProps={{}}
                popupProps={{}}
                draggable={UserService.isModOrAdmin}
                onDragend={(markerProps, mapz, event) => {
                  MapController.handleMoveMarker(markerProps, mapz, event, place);
                }}
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
    const { places, dirty } = this.state;

    // if (!window.myGoogleMap) {
    window.myGoogleMap = (
      <GGMap
        ref={this.mapRef}
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={MapController.handleMapClick}
        onRightclick={MapController.handleRightClick}
        onReady={this.handleMapReady}
        dirty={dirty}
      >
        <this.renderMapElements />
        {false && <LeftToolBar handler={MapController.handleLeftToolbarAction} />}
        <RightToolbarPanel
          ref={this.rightToolbarRef}
          handler={MapController.handleRightToolbarAction}
          places={places}
        />
        <MapContextMenu
          ref={this.mapCtxMenuRef}
          mainMap={this}
          onSelect={MapController.handleContextActions}
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
