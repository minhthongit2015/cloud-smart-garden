import React from 'react';
import { Marker, Polyline, InfoWindow } from 'google-maps-react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/map';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';

    // this.renderMapElements = this.renderMapElements.bind(this);

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

  renderMapElements() {
    if (!window.google) return null;
    const iconMarker = new window.google.maps.MarkerImage(
      'https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(32, 32)
    );
    const pathCoordinates = [
      { lat: 10, lng: 1 },
      { lat: 1, lng: 10 }
    ];

    return (
      <>
        <Marker
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: 0, lng: 0 }}
        />
        <Marker
          icon={iconMarker}
          draggable
          name="Current location"
          onDragend={this.moveMarker}
          position={{ lat: 0, lng: 0 }}
        />
        <Polyline
          path={pathCoordinates}
          options={{
            strokeColor: '#00ffff',
            strokeOpacity: 1,
            strokeWeight: 2,
            icons: [{
              icon: 'hello',
              offset: '0',
              repeat: '10px'
            }]
          }}
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

  render() {
    return (
      <GGMap
        google={this.props.google || window.google}
        render={this.renderMapElements}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
      >
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
          visible={this.state.activeMarker}
        >
          <div className="">
            <p>Hello</p>
          </div>
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
