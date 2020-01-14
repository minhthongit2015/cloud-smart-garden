/* eslint-disable class-methods-use-this */
import React from 'react';
import { MarkerProps, InfoWindowProps } from 'google-maps-react';
import PropTypes from 'prop-types';
import BaseMarker from '../base-marker/BaseMarker';
import PostService from '../../../services/blog/PostService';
import BaseComponent from '../../BaseComponent';
import BaseCircle from '../circle/BaseCircle';
import BaseInfoWindow from '../base-info-window/BaseInfoWindow';
import './DefaultStyle.scss';
import './MarkerWithPopup.scss';


export default class MarkerWithPopup extends BaseComponent.Pure {
  get customClass() {
    return 'custom';
  }

  get googleMapProps() {
    const { google, map } = this.props;
    if (!google || !map) return {};
    return { google, map };
  }

  get circleProps() {
    const { position, radius } = this.props;
    return {
      marker: null,
      center: position,
      radius
    };
  }

  get markerProps() {
    const {
      name, position, icon, draggable
    } = this.props;
    return {
      customClass: this.customClass,
      name,
      position,
      icon: icon || this.markerIcon,
      draggable,
      onClick: this.toggle,
      onLoad: this.handleMakerLoad
    };
  }

  get markerIcon() {
    return null;
  }

  get popupProps() {
    return {
      customClass: this.customClass,
      marker: this.markerRef.current && this.markerRef.current.rootMarker,
      children: this.props.children,
      renderContent: this.renderContent
    };
  }

  get isFocused() {
    return this.popupRef.current.isFocused;
  }

  get isOpen() {
    return this.popupRef.current.isOpen;
  }

  constructor(props) {
    super(props);
    this.circleRef = React.createRef();
    this.markerRef = React.createRef();
    this.popupRef = React.createRef();
    this.bind(
      this.handleMakerLoad,
      this.open, this.close, this.toggle, this.refresh, this.focus, this.remove,
      this.moveTo, this.zoomTo, this.handleGoToPost,
      this.renderContent
    );
  }

  handleMakerLoad() {
    this.forceUpdate();
  }

  open() {
    this.popupRef.current.open();
  }

  close() {
    this.popupRef.current.close();
  }

  toggle() {
    this.popupRef.current.toggle();
  }

  refresh() {
    this.popupRef.current.refresh();
  }

  focus() {
    this.popupRef.current.focus();
    this.popupRef.current.focus();
  }

  remove() {
    this.markerRef.current.remove();
  }

  moveTo(position) {
    this.markerRef.current.moveTo(position);
  }

  zoomTo(zoomz) {
    if (!window.map) return;
    const { place = {} } = this.props;
    const { zoom, position } = place;
    const zoomLevel = zoomz || zoom;
    if (zoomLevel != null && zoomLevel !== '') {
      window.map.setZoom(+zoomLevel);
      window.map.panTo(position);
      this.close();
      setTimeout(() => {
        this.open();
      }, 500);
    }
  }

  handleGoToPost(event) {
    if (event.ctrlKey || event.which !== 1) {
      return;
    }
    event.preventDefault();

    const { place: { post } = {} } = this.props;
    const url = PostService.buildPostUrl(post, { relative: true });
    window.historyz.push(url);
  }

  renderContent() {
    return null;
  }

  render() {
    const { google, map } = this.props;
    if (!google || !map) return null;

    return (
      <React.Fragment>
        <BaseCircle {...this.circleProps} ref={this.circleRef} />
        <BaseMarker {...this.googleMapProps} {...this.markerProps} ref={this.markerRef} />
        <BaseInfoWindow {...this.googleMapProps} {...this.popupProps} ref={this.popupRef} />
      </React.Fragment>
    );
  }
}

MarkerWithPopup.propTypes = {
  google: PropTypes.object,
  map: PropTypes.object,
  place: PropTypes.object,

  // Configs
  openOnHover: PropTypes.bool,
  enableToggle: PropTypes.bool,

  icon: PropTypes.string,
  position: PropTypes.object,

  markerProps: PropTypes.shape(MarkerProps),
  windowProps: PropTypes.shape(InfoWindowProps),

  customMarkerClass: PropTypes.string,
  customWindowClass: PropTypes.string,


  // Events
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

MarkerWithPopup.defaultProps = {
  google: null,
  map: null,
  place: null,

  // Configs
  openOnHover: false,
  enableToggle: true,
  icon: null,
  position: null,
  markerProps: {},
  windowProps: {},
  customMarkerClass: '',
  customWindowClass: '',

  // Events
  onLoad: null,
  onClick: null,
  onHover: null,
  onLeave: null,
  onOpen: null,
  onClose: null
};
