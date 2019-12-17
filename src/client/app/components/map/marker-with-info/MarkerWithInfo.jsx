// import React from 'react';
import { MarkerProps, InfoWindowProps } from 'google-maps-react';
import PropTypes from 'prop-types';
import './MarkerWithInfo.scss';
import BaseMarker from './BaseMarker';
import PostService from '../../../services/PostService';


export default class MarkerWithInfo extends BaseMarker {
  constructor(props) {
    super(props);
    this.handleGoToPost = this.handleGoToPost.bind(this);
    this.zoomTo = this.zoomTo.bind(this);
  }

  handleGoToPost(event) {
    if (event.ctrlKey || event.which !== 1) {
      return;
    }
    event.preventDefault();

    const { post } = this.props.entity;
    const url = PostService.buildPostUrl(post, { relative: true });
    window.realWorldHistory.push(url);
  }

  zoomTo(zoomz) {
    if (!window.map) return;
    const { entity: place = {} } = this.props;
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
}

MarkerWithInfo.propTypes = {
  google: PropTypes.object,
  map: PropTypes.object,
  entity: PropTypes.object,

  // Configs
  openOnHover: PropTypes.bool,
  enableToggle: PropTypes.bool,

  iconSrc: PropTypes.string,
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

MarkerWithInfo.defaultProps = {
  google: null,
  map: null,
  entity: null,

  // Configs
  openOnHover: false,
  enableToggle: true,
  iconSrc: null,
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
