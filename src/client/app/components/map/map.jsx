import React, { Component } from 'react';
import './map.scss';
import {
  Map, GoogleApiWrapper,
  Marker, Polyline
} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.moveMarker = this.moveMarker.bind(this);
  }

  moveMarker() {
    return this.test;
  }

  render() {
    return (
      <Map
        google={this.props.google || window.google}
        className="map"
        style={{ height: '100%', position: 'relative', width: '100%' }}
        {...this.props}
      >
        {this.props.children}
      </Map>
    );
  }
}


function MapLoadingContainer() {
  return (
    <React.Fragment>
      <div style={{ position: 'relative' }}>Fancy loading container!</div>
    </React.Fragment>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKrWKRawpxPrWnYfcMyXzcqhCewKFauzw',
  LoadingContainer: MapLoadingContainer
})(MapContainer);
