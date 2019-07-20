import React from 'react';
import { Polyline } from 'google-maps-react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/Map';
import StoreMarker from '../../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../../components/map/user-marker/UserMarker';
import FarmMarker from '../../components/map/farm-marker/FarmMarker';


export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';

    this.markers = new Set();

    this.defaultMapProps = {
      initialCenter: { lat: 0, lng: 0 },
      zoom: 4,
      greatPlaceCoords: { lat: 1, lng: 2 }
    };

    this.renderMapElements = this.renderMapElements.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  onMapClicked = () => {
    this.markers.forEach(marker => marker.close());
  };

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
    this.updatePageTitle();
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };

    const shopName1 = 'Yoth Shop';
    const userName1 = 'Minh Thông';
    const farmName1 = 'Morning';

    return (
      <React.Fragment>
        <StoreMarker
          ref={ref => this.markers.add(ref)}
          {...baseProps}
          markerProps={
            {
              // title: 'Test',
              name: shopName1,
              position: { lng: -5, lat: 5 },
              draggable: true
            }
          }
          windowProps={{}}
          name={shopName1}
        />
        <GardenToolsMarker
          ref={ref => this.markers.add(ref)}
          {...baseProps}
          markerProps={
            {
              // title: 'Test',
              name: shopName1,
              position: { lng: 15, lat: -5 },
              draggable: true
            }
          }
          windowProps={{}}
          name={shopName1}
        />
        <UserMarker
          ref={ref => this.markers.add(ref)}
          {...baseProps}
          markerProps={
            {
              // title: 'Test',
              name: userName1,
              position: { lng: 0, lat: 0 },
              draggable: true
            }
          }
          windowProps={{}}
          name={userName1}
        />
        <UserMarker
          ref={ref => this.markers.add(ref)}
          {...baseProps}
          markerProps={
            {
              // title: 'Test',
              name: userName1,
              position: { lng: -25, lat: 0 },
              draggable: true
            }
          }
          windowProps={{}}
          name={userName1}
        />
        <FarmMarker
          ref={ref => this.markers.add(ref)}
          {...baseProps}
          markerProps={
            {
              // title: 'Test',
              name: farmName1,
              position: { lng: 5, lat: 5 },
              draggable: true
            }
          }
          windowProps={{}}
          name={farmName1}
        />
        <Polyline
          {...baseProps}
          path={[
            { lat: 5, lng: -5 },
            { lat: 0, lng: 0 },
            { lat: 5, lng: 5 },
            { lat: 5, lng: -5 }
          ]}
          strokeColor="#00ffff"
          strokeOpacity={0.8}
          strokeWeight={2}
          geodesic
        />
      </React.Fragment>
    );
  }

  render() {
    if (!window.myGoogleMap) {
      window.myGoogleMap = (
        <GGMap
          google={this.props.google || window.google}
          {...this.defaultMapProps}
          onClick={this.onMapClicked}
          // onReady={this.attachEvents}
        >
          <this.renderMapElements />
        </GGMap>
      );
    }
    return (
      <div {...this.props} onKeyDown={this.handleHotkeys}>
        {window.myGoogleMap}
      </div>
    );
  }
}
