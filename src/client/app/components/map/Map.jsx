/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Map.scss';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Config from '../../config';
import LeafLoading from '../utils/loadings/LeafLoading';
import t from '../../languages';

export class MapContainer extends Component {
  render() {
    console.log('render "Comps/map/Map.jsx"');
    const google = this.props.google || window.google;
    return (
      <Map
        google={google}
        className="map"
        style={{ height: '100%', position: 'relative', width: '100%' }}
        visible={false}
        {...this.props}
        minZoom={2}
      >
        {this.props.children}
      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  // center: PropTypes.object,
  initialCenter: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  visible: PropTypes.bool,
  mapType: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  clickableIcons: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  zoomControl: PropTypes.bool,
  zoomControlOptions: PropTypes.object,
  mapTypeControl: PropTypes.bool,
  mapTypeControlOptions: PropTypes.bool,
  scaleControl: PropTypes.bool,
  streetViewControl: PropTypes.bool,
  streetViewControlOptions: PropTypes.object,
  panControl: PropTypes.bool,
  rotateControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
  scrollwheel: PropTypes.bool,
  draggable: PropTypes.bool,
  draggableCursor: PropTypes.string,
  keyboardShortcuts: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  noClear: PropTypes.bool,
  styles: PropTypes.array,
  gestureHandling: PropTypes.string,
  bounds: PropTypes.object
};

MapContainer.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  // center: {},
  centerAroundCurrentLocation: false,
  style: {},
  containerStyle: {},
  visible: true
};

function MapLoadingContainer() {
  return (
    <LeafLoading overlaping text={t('pages.theRealWorld.loadingText')} />
  );
}
export default GoogleApiWrapper({
  apiKey: Config.GOOGLE_CLOUD_API_KEY, // My Key
  // apiKey: 'AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM', // Google Key
  LoadingContainer: MapLoadingContainer
})(MapContainer);
