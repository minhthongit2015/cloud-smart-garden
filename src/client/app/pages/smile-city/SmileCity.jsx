import React from 'react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/Map';
import UserMarker from '../../components/map/user-marker/UserMarker';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';

    this.renderMapElements = this.renderMapElements.bind(this);

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

    this.testMarkerRef = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };

    const name = 'KID';
    return (
      <UserMarker
        ref={this.testMarkerRef}
        {...baseProps}
        onOpen={this.attachEvents}
        markerProps={
          {
            title: 'Test',
            name: 'Test Custom Marker',
            position: { lat: -5, lng: -5 },
            draggable: true
          }
        }
        windowProps={{}}
        name={name}
      />
    );
  }

  onMapClicked = () => {
    this.testMarkerRef.current.close();
  };

  render() {
    if (!window.myGoogleMap) {
      window.myGoogleMap = (
        <GGMap
          google={this.props.google || window.google}
          {...this.defaultMapProps}
          onClick={this.onMapClicked}
          onReady={this.attachEvents}
        >
          <this.renderMapElements />
        </GGMap>
      );
    }
    return (
      <div {...this.props}>
        {window.myGoogleMap}
      </div>
    );
  }
}
