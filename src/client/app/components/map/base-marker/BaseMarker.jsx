/* eslint-disable class-methods-use-this */
import React from 'react';
import { Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import BaseComponent from '../../BaseComponent';
import './BaseMarker.scss';


export default class BaseMarker extends BaseComponent.Pure {
  get customClass() {
    return this.props.customClass || 'custom';
  }

  get markerClass() {
    return `${this.customClass}-marker`;
  }

  get markerTitle() {
    return this.markerElement.length > 0 ? this.markerRef.marker.title : this.id;
  }

  get originMarkerElement() {
    return jQuery(`.gm-style *[title="${this.id}"]`);
  }

  get markerElement() {
    return jQuery(document.getElementById(this.id));
  }

  // eslint-disable-next-line class-methods-use-this
  get allMarkerElements() {
    return jQuery(`.gm-style .${this.markerClass}`);
  }

  get rootMarker() {
    return this.markerRef && this.markerRef.marker;
  }

  constructor(props) {
    super(props);
    this.markerRef = null;
    this.windowRef = React.createRef();

    this.bind(
      this.handleMarkerRef, this.initMarker,
      this.handleClick, this.handleMouseEnter, this.handleMouseLeave
    );
  }

  focus() {
    this.isClosing = false;
    this.allMarkerElements.removeClass('focused');
    this.markerElement.addClass('focused');
  }

  moveTo(position) {
    if (!position) {
      // eslint-disable-next-line prefer-destructuring
      position = this.props.entity.position;
    }
    if (position) {
      this.props.entity.position = position;
      this.rootMarker.setPosition(position);
    }
  }

  remove() {
    this.rootMarker.setMap(null);
  }

  handleMarkerRef(ref) {
    if (!ref) return;
    this.markerRef = ref;
    this.markerRef.marker.parent = this;
    const interval = setInterval(() => {
      if (this.originMarkerElement.length > 0) {
        this.initMarker();
        clearInterval(interval);
      }
    }, 100);
  }

  initMarker() {
    const { title } = this.props;
    this.originMarkerElement
      .addClass(BaseMarker.markerClass)
      .addClass(this.markerClass)
      .attr('title', title || '')
      .attr('id', this.id);
    this.markerRef.marker.title = title || '';
    this.dispatchEvent(this.Events.load, this);
  }

  handleClick(...args) {
    this.dispatchEvent(this.Events.click, this, ...args);
  }

  handleMouseEnter(...args) {
    this.dispatchEvent(this.Events.mouseEnter, this, ...args);
  }

  handleMouseLeave(...args) {
    this.dispatchEvent(this.Events.mouseLeave, this, ...args);
  }

  buildMarkerIcon() {
    const { google, icon } = this.props;
    if (!icon) return;
    this._markerIcon = new google.maps.MarkerImage(
      icon,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(32, 32)
    );
  }

  get markerIcon() {
    if (!this._markerIcon) {
      this.buildMarkerIcon();
    }
    return this._markerIcon;
  }

  render() {
    const {
      google, map, icon, ...restProps
    } = this.props;
    if (!google || !map) return null;

    return (
      <Marker
        ref={this.handleMarkerRef}
        google={google}
        map={map}
        onClick={this.handleClick}
        onMouseover={this.handleMouseEnter}
        onMouseout={this.handleMouseLeave}
        onFocus={this.handleNothing}
        onBlur={this.handleNothing}
        icon={this.markerIcon}
        {...restProps}
        title={this.markerTitle}
      />
    );
  }
}

BaseMarker.propTypes = {
  google: PropTypes.object,
  map: PropTypes.object,

  icon: PropTypes.string,
  position: PropTypes.object,

  customMarkerClass: PropTypes.string,
  customWindowClass: PropTypes.string,

  // Events
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onLeave: PropTypes.func
};

BaseMarker.defaultProps = {
  google: null,
  map: null,

  // Configs
  icon: null,
  position: null,
  customMarkerClass: '',
  customWindowClass: '',

  // Events
  onLoad: null,
  onClick: null,
  onHover: null,
  onLeave: null
};
