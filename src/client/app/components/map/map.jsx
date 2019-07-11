import React, { Component } from 'react';
import {
  Map, Marker, GoogleApiWrapper, Polyline
} from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
  };

  constructor(props) {
    super(props);
    this.moveMarker = this.moveMarker.bind(this);
  }

  moveMarker() {
    return this.test;
  }

  render() {
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
      <React.Fragment>
        <Map google={this.props.google || window.google} zoom={14} style={style}>
          <Marker
            icon={iconMarker}
            draggable
            name="Current location"
            onDragend={this.moveMarker}
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
          {/* <InfoWindow
            visible={showInfoWindow}
            style={styles.infoWindow}
          >
            <div className={classes.infoWindow}>
              <p>Click on the map or drag the marker to select </p>
            </div>
          </InfoWindow> */}
        </Map>
      </React.Fragment>
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
