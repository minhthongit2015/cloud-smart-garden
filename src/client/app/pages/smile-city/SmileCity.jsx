/* eslint-disable no-param-reassign */
import React from 'react';
import superagent from 'superagent';
import { Polyline } from 'google-maps-react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/Map';
import StoreMarker from '../../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../../components/map/user-marker/UserMarker';
import FarmMarker from '../../components/map/farm-marker/FarmMarker';

import { apiEndPoints } from '../../utils/Constants';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';
    this.state = {
      dirty: false,
      mapObjects: [],
      foodShops: [
        {
          name: 'Yoth Shop',
          position: { lat: 10.82070679248785, lng: 106.68745543348007 }
        }
      ],
      toolShops: [
        {
          name: 'One Fix',
          position: { lat: 10.82152650027889, lng: 106.68726928436138 }
        }
      ],
      farms: [
        {
          name: 'Morning',
          position: { lat: 10.821897787271718, lng: 106.68756363503007 }
        }
      ]
    };
    this.state.places = [
      ...this.state.foodShops.map(foodShop => foodShop.position),
      ...this.state.toolShops.map(toolShop => toolShop.position),
      ...this.state.farms.map(farm => farm.position)
    ];

    this.markers = new Set();

    const center = [10.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      zoom: 16
    };

    this.renderMapElements = this.renderMapElements.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.onMarkerRef = this.onMarkerRef.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.dirty) {
  //     this.state.dirty = false;
  //     return true;
  //   }
  //   return false;
  // }
  onMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
  }

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

  async loadMapObjects() {
    const mapObjects = await this.fetchMapObjects();
    mapObjects.forEach((object) => {
      // eslint-disable-next-line no-param-reassign
      object.position = { lat: +object.position.split(', ')[0], lng: +object.position.split(', ')[1] };
    });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      mapObjects.forEach((object) => {
        // eslint-disable-next-line no-param-reassign
        object.position.lat += 0.0001;
        object.ref.rootMarker.setPosition(object.position);
      });
    }, 1000);
    this.setState({
      dirty: true,
      mapObjects
    });
    // this.forceUpdate();
  }

  // eslint-disable-next-line class-methods-use-this
  fetchMapObjects() {
    return superagent.get(`${apiEndPoints.map.objects.LIST}/123?t=asd`)
      .then(res => (res.body ? res.body.data.objects || [] : []));
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

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    const {
      mapObjects, foodShops, toolShops, farms, places
    } = this.state;

    return (
      <React.Fragment>
        {foodShops.map(foodShop => (
          <StoreMarker
            key={foodShop.name}
            ref={(ref) => { this.onMarkerRef(ref); foodShop.ref = ref; }}
            {...baseProps}
            object={foodShop}
            markerProps={
              {
                name: foodShop.name,
                position: foodShop.position,
                draggable: true
              }
            }
            windowProps={{}}
            name={foodShop.name}
          />
        ))}
        {toolShops.map(toolShop => (
          <GardenToolsMarker
            key={toolShop.name}
            ref={(ref) => { this.onMarkerRef(ref); toolShop.ref = ref; }}
            {...baseProps}
            object={toolShop}
            markerProps={
              {
                name: toolShop.name,
                position: toolShop.position,
                draggable: true
              }
            }
            windowProps={{}}
            name={toolShop.name}
          />
        ))}
        {farms.map(farm => (
          <FarmMarker
            key={farm.name}
            ref={(ref) => { this.onMarkerRef(ref); farm.ref = ref; }}
            {...baseProps}
            object={farm}
            markerProps={
              {
                name: farm.name,
                position: farm.position,
                draggable: true
              }
            }
            windowProps={{}}
            name={farm.name}
          />
        ))}
        {mapObjects.map(object => (
          <UserMarker
            key={object.name}
            ref={(ref) => { this.onMarkerRef(ref); object.ref = ref; }}
            {...baseProps}
            object={object}
            markerProps={
              {
                name: object.name,
                position: object.position,
                draggable: true
              }
            }
            windowProps={{}}
            name={object.name}
          />
        ))}
        <Polyline
          {...baseProps}
          path={places}
          strokeColor="#00ffff"
          strokeOpacity={0.8}
          strokeWeight={2}
          geodesic
        />
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
