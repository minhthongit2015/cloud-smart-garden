import React from 'react';
import { Marker, InfoWindow } from 'google-maps-react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/map';

import { ShoppingCartSrc } from '../../assets/icons';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';

    this.handleInfoWindowClick = this.handleInfoWindowClick.bind(this);
    this.renderMapElements = this.renderMapElements.bind(this);
    this.attachEvents = this.attachEvents.bind(this);

    this.defaultMapProps = {
      initialCenter: { lat: 0, lng: 0 },
      zoom: 4,
      greatPlaceCoords: { lat: 1, lng: 2 }
    };

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    };
  }

  attachEvents() {
    const btn = document.getElementById('zzz');
    if (btn) {
      btn.addEventListener('click', (e) => {
        this.handleInfoWindowClick(e);
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;

    this.infowindow = new google.maps.InfoWindow({
      content: '<button id="zzz">Click me please</button>'
    });
    const iw = this.infowindow;

    google.maps.event
      .addListener(iw, 'click', () => alert(123));
    google.maps.event
      .addListener(iw, 'domready', () => {
        this.attachEvents();
      });
    const pos = new google.maps.LatLng(0, 5);
    this.infowindow.setPosition(pos);
    this.infowindow.open(map);

    const iconMarker = new google.maps.MarkerImage(
      ShoppingCartSrc,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new props.google.maps.Size(32, 32)
    );

    return (
      <>
        <Marker
          google={google}
          map={map}
          icon={iconMarker}
          draggable
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: 5, lng: 5 }}
        />
      </>
    );
  }

  onMarkerClick = (props, marker) => this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

  onInfoWindowClose = () => this.setState({
    activeMarker: null,
    showingInfoWindow: false
  });

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleInfoWindowClick(event) {
    if (event.target.tagName === 'BUTTON') {
      alert('clicked');
    }
  }

  render() {
    return (
      <GGMap
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onReady={this.attachEvents}
      >
        <this.renderMapElements />
        <Marker
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: 0, lng: 0 }}
          onClick={this.onMarkerClick}
        />
        <Marker
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: 5, lng: 0 }}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={!!this.state.activeMarker}
        >
          {this.state.activeMarker
            ? (
              <div className="zzzz">
                <h1>{this.state.activeMarker.title}</h1>
                <div className="p-3">
                  <button type="button" id="btnzzz">Test</button>
                </div>
              </div>
            ) : <div />
          }
        </InfoWindow>
        <InfoWindow mapCenter={{ lat: 0, lng: 0 }} visible google={window.google}>
          <small>
            Click on any of the markers to display an additional info.
          </small>
        </InfoWindow>
      </GGMap>
    );
  }
}
