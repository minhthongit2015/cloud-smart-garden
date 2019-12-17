import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import uuid from 'uuid';
import './MarkerWithInfo.scss';
import { mapTreeNodeToArray } from '../../../utils/DOM';

const CUSTOM_CLASS = 'custom';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;


export default class MarkerWithInfo extends Component {
  get isOpen() {
    return !!this.state.marker;
  }

  get infoWindowTopMost() {
    return this.infoWindowWrapper.parent();
  }

  get infoWindowWrapper() {
    return jQuery(document.getElementById(this.uid)).parents('.gm-style-iw-a');
  }

  // eslint-disable-next-line class-methods-use-this
  get allInfoWindowTopElements() {
    return jQuery('.gm-style .gm-style-iw-a').parents('');
  }

  get isFocused() {
    return this.infoWindowTopMost.hasClass('focused');
  }

  get markerTitle() {
    return this.markerElement.length > 0 ? this.markerRef.marker.title : this.markerId;
  }

  get markerId() {
    return `marker-${this.uid}`;
  }

  get originMarkerElement() {
    return jQuery(`.gm-style div[title="marker-${this.uid}"]`);
  }

  get markerElement() {
    return jQuery(document.getElementById(this.markerId));
  }

  // eslint-disable-next-line class-methods-use-this
  get allMarkerElements() {
    return jQuery(`.gm-style .${CUSTOM_MARKER_CLASS}`);
  }

  buildMarkerIcon() {
    if (!this.props.iconSrc) return;
    this.markerIcon = new this.google.maps.MarkerImage(
      this.props.iconSrc,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new this.google.maps.Size(32, 32)
    );
  }

  get rootMarker() {
    return this.markerRef.marker;
  }

  constructor(props) {
    super(props);
    this.state = {
      marker: null
    };
    this.markerRef = null;
    this.windowRef = React.createRef();

    this.onMarkerRef = this.onMarkerRef.bind(this);
    this.onMarkerLoaded = this.onMarkerLoaded.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.onMarkerLeave = this.onMarkerLeave.bind(this);

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onForceClose = this.onForceClose.bind(this);

    this.uid = uuid.v1();
  }

  focus() {
    this.isClosing = false;
    this.allInfoWindowTopElements.removeClass('focused');
    this.infoWindowTopMost.addClass('focused');
    this.allMarkerElements.removeClass('focused');
    this.markerElement.addClass('focused');
  }

  open() {
    if (this.isOpen && !this.isClosing) return;
    this.isClosing = false;
    this.setState({
      marker: this.markerRef.marker
    });
  }

  close() {
    if (!this.isOpen || this.isClosing) return;
    this.isClosing = true;
    this.infoWindowWrapper.addClass('fadeOut animated faster')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        this.isClosing = false;
        this.setState({
          marker: null
        });
      });
    this.onClose();
  }

  toggle() {
    if (this.isOpen && !this.isClosing) {
      if (this.isFocused) {
        this.close();
      } else {
        this.focus();
      }
    } else {
      this.open();
    }
  }

  onMarkerRef(ref) {
    this.markerRef = ref;
    this.markerRef.marker.parent = this;
    const interval = setInterval(() => {
      if (this.originMarkerElement.length > 0) {
        this.onMarkerLoaded();
        clearInterval(interval);
      }
    }, 100);
  }

  onMarkerLoaded() {
    this.originMarkerElement
      .addClass(CUSTOM_MARKER_CLASS)
      .addClass(this.props.customMarkerClass)
      .attr('title', this.props.title || '')
      .attr('id', this.markerId);
    this.markerRef.marker.title = this.props.title || '';
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  onOpen() {
    this.infoWindowTopMost.addClass(CUSTOM_WINDOW_CLASS);
    this.infoWindowWrapper.addClass(this.props.customWindowClass);
    this.focus();
    const root = jQuery(`#${this.uid}`);
    this._nodeMap.forEach((node) => {
      const child = root.find(`${node.selector}`);
      node.props.forEach(([key, value]) => {
        if (key.startsWith('on')) {
          child.on(key.substr(2).toLowerCase(), value);
        } else if (key === 'style') {
          child.css(value);
        } else {
          child.attr(key, value);
        }
      });
    });
    this.infoWindowWrapper.on('click', () => this.focus());
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onForceClose() {
    this.isClosing = false;
    this.setState({
      marker: null
    });
    this.onClose();
  }

  onMarkerClick(/* props, marker */) {
    this.openByHover = false;
    if (this.props.enableToggle) {
      this.toggle();
    } else if (!this.isOpen) {
      this.open();
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onMarkerHover() {
    if (this.props.openOnHover && !this.isOpen) {
      this.open();
      this.openByHover = true;
    }
    if (this.props.onHover) {
      this.props.onHover();
    }
  }

  onMarkerLeave() {
    if (this.props.openOnHover && this.openByHover) {
      this.close();
    }
    if (this.props.onLeave) {
      this.props.onLeave();
    }
  }

  storeContentOriginTree() {
    this._nodeMap = [];
    mapTreeNodeToArray(this.props.children, this._nodeMap);
  }

  render() {
    const {
      google, map, markerProps, windowProps
    } = this.props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    this.storeContentOriginTree();
    const Content = () => (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );

    if (!this.markerIcon) {
      this.buildMarkerIcon();
    }

    console.log('render marker', this.isOpen);

    return (
      <React.Fragment>
        <Marker
          ref={this.onMarkerRef}
          {...baseProps}
          onClick={this.onMarkerClick}
          onFocus={() => {}}
          onMouseover={this.onMarkerHover}
          onMouseout={this.onMarkerLeave}
          onBlur={() => {}}
          icon={this.markerIcon}
          {...markerProps}
          title={this.markerTitle}
        />
        <InfoWindow
          ref={this.windowRef}
          marker={this.state.marker}
          {...baseProps}
          {...windowProps}
          onOpen={this.onOpen}
          onClose={this.onForceClose}
          visible={this.isOpen}
        >
          <div id={this.uid}>
            <Content />
          </div>
        </InfoWindow>
      </React.Fragment>
    );
  }
}

MarkerWithInfo.propTypes = {
  google: PropTypes.object,
  map: PropTypes.object,
  entity: PropTypes.object,
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
  enableToggle: PropTypes.bool,
  openOnHover: PropTypes.bool,
  iconSrc: PropTypes.string,
  position: PropTypes.object,
  markerProps: PropTypes.shape(MarkerProps),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  windowProps: PropTypes.shape(InfoWindowProps),
  customMarkerClass: PropTypes.string,
  customWindowClass: PropTypes.string
};

MarkerWithInfo.defaultProps = {
  google: null,
  map: null,
  entity: null,
  onLoad: null,
  onClick: null,
  onHover: null,
  onLeave: null,
  enableToggle: true,
  openOnHover: false,
  iconSrc: null,
  position: null,
  markerProps: {},
  onOpen: null,
  onClose: null,
  windowProps: {},
  customMarkerClass: '',
  customWindowClass: ''
};
