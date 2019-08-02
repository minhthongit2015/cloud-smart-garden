/* eslint-disable no-param-reassign */
import React from 'react';
import superagent from 'superagent';
import { Polyline } from 'google-maps-react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/Map';
import MarkerWithInfo from '../../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../../components/map/user-marker/UserMarker';
import FarmMarker from '../../components/map/farm-marker/FarmMarker';

import { apiEndpoints } from '../../utils/Constants';

export default class SmileCity extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';
    this.state = {
      dirty: false,
      mapEntities: [],
      places: null
    };

    this.markers = new Set();

    const center = [10.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      zoom: 17
    };

    this.onMapReady = this.onMapReady.bind(this);
    this.onMarkerRef = this.onMarkerRef.bind(this);
    this.renderMapElements = this.renderMapElements.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMoveMarker = this.onMoveMarker.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.dirty) {
  //     this.state.dirty = false;
  //     return true;
  //   }
  //   return false;
  // }

  onMapReady() {
    this.map.setMapTypeId(this.google.maps.MapTypeId.SATELLITE);
    this.map.setOptions({
      restriction: {
        latLngBounds: {
          north: 70, south: -70, west: -180, east: 180
        },
        strictBounds: true
      },
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: true,
      streetViewControl: true
    });
    this.loadMapObjects();
  }

  onMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
  }

  static getMarkerByType(type) {
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

  async loadMapObjects() {
    const mapEntities = await this.fetchMapObjects();

    mapEntities.forEach((entity) => {
      entity.marker = SmileCity.getMarkerByType(entity.type);
      if (entity.type === 'Garden') {
        entity.picture = `https://graph.facebook.com/${entity.socials.fb}/picture?type=square&width=200&height=200`;
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    // clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   mapEntities.forEach((mapEntity) => {
    //     if (mapEntity.type === 'Garden') {
    //       mapEntity.position.lat += 0.0001;
    //       mapEntity.ref.rootMarker.setPosition(mapEntity.position);
    //     }
    //   });
    // }, 1000);

    const places = mapEntities.map(mapEntity => mapEntity.position);
    if (places.length > 0) places.push(places[0]);

    this.setState({
      dirty: true,
      mapEntities,
      places
    });
    // this.forceUpdate();
  }

  // eslint-disable-next-line class-methods-use-this
  fetchMapObjects() {
    return superagent.get(`${apiEndpoints.map.entities.LIST}?sort=[["_id", 1]]`)
      .then(res => (res.body ? res.body.data.entities || [] : []));
  }

  onMapClicked(mapProps, map, event) {
    if (window.key.ctrl) {
      // eslint-disable-next-line no-alert
      return prompt('LatLng', `${event.latLng.lat()}, ${event.latLng.lng()}`);
    }
    if (window.key.shift) {
      return this.loadMapObjects();
    }
    return this.markers.forEach(marker => marker && marker.close());
  }

  handleHotkeys(event) {
    if (event.key === 'Tab') {
      this.switchMarker();
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

  onMoveMarker(markerProps, map, event, entity) {
    console.log(event);

    this.setState((prevState) => {
      entity.position = event.latLng.toJSON();
      // const marker = prevState.mapEntities.find(mapEntity => mapEntity.z);
      const places = prevState.mapEntities.map(mapEntity => mapEntity.position);
      if (places.length > 0) places.push(places[0]);
      return {
        dirty: true,
        places
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    const {
      mapEntities, places
    } = this.state;

    return (
      <React.Fragment>
        {mapEntities.map(mapEntity => (
          mapEntity.marker
            ? (
              <mapEntity.marker
                key={mapEntity.name}
                ref={(ref) => { this.onMarkerRef(ref); mapEntity.ref = ref; }}
                {...baseProps}
                entity={mapEntity}
                markerProps={
                  {
                    name: mapEntity.name,
                    position: mapEntity.position,
                    draggable: true,
                    onDragend: (markerProps, mapz, event) => {
                      this.onMoveMarker(markerProps, mapz, event, mapEntity);
                    }
                  }
                }
                windowProps={{}}
                name={mapEntity.name}
              />
            ) : null
        ))}
        {places ? (
          <Polyline
            {...baseProps}
            path={places}
            strokeColor="#00ffff"
            strokeOpacity={0.8}
            strokeWeight={2}
            geodesic
          />
        ) : null}
      </React.Fragment>
    );
  }

  render() {
    console.log('render "Pages/smile-city/SmileCity.jsx"');
    // if (!window.myGoogleMap) {
    window.myGoogleMap = (
      <GGMap
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onReady={this.onMapReady}
        dirty={this.state.dirty}
      >
        <this.renderMapElements />
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
