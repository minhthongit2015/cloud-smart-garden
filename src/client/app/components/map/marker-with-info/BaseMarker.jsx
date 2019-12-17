import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import uuid from 'uuid';
import './BaseMarkerStyle.scss';
import './MarkerWithInfo.scss';
import './DefaultStyle.scss';
import { mapTreeNodeToArray } from '../../../utils/DOM';
import Circle from '../circle/Circle';
import MapService from '../../../services/MapService';


export default class MarkerWithInfo extends Component {
  static get customClass() {
    return 'custom';
  }

  static get markerClass() {
    return `${this.customClass}-marker`;
  }

  static get windowClass() {
    return `${this.customClass}-info-window`;
  }

  get isOpen() {
    return !!this.state.marker;
  }

  get isReallyOpen() {
    return this.isOpen && !this.isClosing && this.infoWindowTopMost.length > 0;
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
    return jQuery(`.gm-style .${this.constructor.markerClass}`);
  }

  get rootMarker() {
    return this.markerRef.marker;
  }

  get baseProps() {
    const { google, map } = this.props;
    if (!google || !map) return null;
    return { google, map };
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
    if (this.isReallyOpen) return;
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
    if (this.isReallyOpen) {
      if (this.isFocused) {
        this.close();
      } else {
        this.focus();
      }
    } else {
      this.open();
    }
  }

  refresh() {
    this.forceUpdate(() => {
      this.windowRef.current.updateContent();
    });
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

  onMarkerRef(ref) {
    if (!ref) return;
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
      .addClass(MarkerWithInfo.markerClass)
      .addClass(this.constructor.markerClass)
      .attr('title', this.props.title || '')
      .attr('id', this.markerId);
    this.markerRef.marker.title = this.props.title || '';
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  onOpen() {
    MapService.openPlace(this.props.entity);
    this.infoWindowTopMost.addClass(MarkerWithInfo.windowClass);
    this.infoWindowWrapper.addClass(this.constructor.windowClass);
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
    MapService.closePlace();
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
    } else if (!this.isReallyOpen) {
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
    mapTreeNodeToArray(this.props.children || this.content, this._nodeMap);
  }

  buildMarkerIcon() {
    if (!this.props.iconSrc) return;
    this._markerIcon = new this.google.maps.MarkerImage(
      this.props.iconSrc,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new this.google.maps.Size(32, 32)
    );
  }

  get markerIcon() {
    if (!this._markerIcon) {
      this.buildMarkerIcon();
    }
    return this._markerIcon;
  }

  renderArea() {
    if (!this.baseProps) return null;
    const { position, radius } = this.props.markerProps;

    return (
      radius && <Circle {...this.baseProps} marker={this} center={position} radius={radius} />
    );
  }

  renderInfoWindows() {
    if (!this.baseProps) return null;
    const { windowProps } = this.props;
    this.content = this.renderContent();
    if (this.windowRef.current && this.state.marker
      && this.windowRef.current.infowindow.map === null) {
      this.windowRef.current.infowindow.marker = this.state.marker;
      this.windowRef.current.infowindow.setMap(this.baseProps.map);
    }

    return (
      <InfoWindow
        ref={this.windowRef}
        marker={this.state.marker}
        {...this.baseProps}
        {...windowProps}
        onOpen={this.onOpen}
        onClose={this.onForceClose}
        visible={this.isOpen}
      >
        <div id={this.uid}>
          {this.content}
        </div>
      </InfoWindow>
    );
  }

  renderContent() {
    return this.props.children;
  }

  render() {
    const {
      google, map, markerProps
    } = this.props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    this.storeContentOriginTree();

    return (
      <React.Fragment>
        {this.renderArea()}
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
        {this.renderInfoWindows()}
      </React.Fragment>
    );
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
