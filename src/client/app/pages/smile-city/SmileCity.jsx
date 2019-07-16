import React from 'react';
import $ from 'jquery';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/Map';
import MarkerWithInfo from '../../components/map/extendeds/MarkerWithInfo';

import { ShoppingCartSrc } from '../../assets/icons';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';

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

    this.testMarkerRef = React.createRef();
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
  handleInfoWindowClick(event) {
    if (event.target.tagName === 'BUTTON') {
      alert('clicked');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const defaultProps = { google, map };

    const iconMarker = new google.maps.MarkerImage(
      ShoppingCartSrc,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new props.google.maps.Size(32, 32)
    );

    return (
      <MarkerWithInfo
        ref={this.testMarkerRef}
        {...defaultProps}
        onOpen={this.attachEvents}
        markerProps={
          {
            title: 'Test',
            name: 'Test Custom Marker',
            position: { lat: -5, lng: -5 },
            draggable: true,
            icon: iconMarker
          }
        }
        windowProps={{}}
      >
        <div onClick={() => alert(123)}>
          <h4>Hello</h4>
          <button type="button" id="zzz">Click Me!</button>
        </div>
      </MarkerWithInfo>
    );
  }

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
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onReady={this.attachEvents}
      >
        <this.renderMapElements />
      </GGMap>
    );
  }
}
