import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import uuid from 'uuid';
import './MarkerWithInfo.scss';
import { mapTreeNodeToArray } from '../../../utils/DOM';

const CUSTOM_INFO_WINDOW_CLASS = 'marker-info-window';


export default class MarkerWithInfo extends Component {
  get isOpen() {
    return !!this.state.marker;
  }

  get infoWindowTopMost() {
    return this.infoWindowWrapper.parent();
  }

  get infoWindowWrapper() {
    return jQuery(`#${this.uid}`).parents('.gm-style-iw-a');
  }

  // eslint-disable-next-line class-methods-use-this
  get allInfoWindowTopElements() {
    return jQuery('.gm-style-iw-a').parents('');
  }

  get isFocused() {
    return this.infoWindowTopMost.hasClass('focused');
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

  constructor(props) {
    super(props);
    this.marker = null;
    this.state = {
      marker: null
    };
    this.markerRef = React.createRef();
    this.windowRef = React.createRef();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.onMarkerFocus = this.onMarkerFocus.bind(this);
    this.onForceClose = this.onForceClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMarkerLeave = this.onMarkerLeave.bind(this);
    this.onMarkerBlur = this.onMarkerBlur.bind(this);
    this.onMarkerLoaded = this.onMarkerLoaded.bind(this);

    this.uid = uuid.v1();
  }

  focus() {
    this.isClosing = false;
    this.allInfoWindowTopElements.removeClass('focused');
    this.infoWindowTopMost.addClass('focused');
  }

  open() {
    this.isClosing = false;
    this.setState({
      marker: this.markerRef.current.marker
    });
  }

  close() {
    this.isClosing = true;
    this.infoWindowWrapper.addClass('fadeOut animated faster')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        this.isClosing = false;
        this.setState({
          marker: null
        });
      });
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

  onOpen() {
    this.infoWindowTopMost.addClass(CUSTOM_INFO_WINDOW_CLASS);
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
    this.close();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onForceClose() {
    this.isClosing = false;
    this.setState({
      marker: null
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onMarkerClick(/* props, marker */) {
    this.openByHover = false;
    if (this.props.enableToggle) {
      this.toggle();
    } else if (!this.isOpen) {
      this.open();
    }
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick();
    }
  }

  onMarkerFocus() {
    if (this.props.onMarkerFocus) {
      this.props.onMarkerFocus();
    }
  }

  onMarkerHover() {
    // if (!this.isOpen) {
    //   this.open();
    //   this.openByHover = true;
    // }
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover();
    }
  }

  onMarkerLeave() {
    // if (this.openByHover) {
    //   this.close();
    // }
    if (this.props.onMarkerLeave) {
      this.props.onMarkerLeave();
    }
  }

  onMarkerBlur() {
    // if (this.openByHover) {
    //   this.close();
    // }
    if (this.props.onMarkerBlur) {
      this.props.onMarkerBlur();
    }
  }

  onMarkerLoaded() {
    this.open();
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

    return (
      <React.Fragment>
        <Marker
          ref={this.markerRef}
          {...baseProps}
          onLoad={this.onMarkerLoaded}
          onClick={this.onMarkerClick}
          onFocus={this.onMarkerFocus}
          onMouseover={this.onMarkerHover}
          onMouseout={this.onMarkerLeave}
          onBlur={this.onMarkerBlur}
          icon={this.markerIcon}
          {...markerProps}
          className="asdf"
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
  onMarkerClick: PropTypes.func,
  onMarkerFocus: PropTypes.func,
  onMarkerHover: PropTypes.func,
  enableToggle: PropTypes.bool,
  iconSrc: PropTypes.string,
  position: PropTypes.object,
  markerProps: PropTypes.shape(MarkerProps),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  windowProps: PropTypes.shape(InfoWindowProps)
};

MarkerWithInfo.defaultProps = {
  // markerProps: {},
  google: null,
  map: null,
  onMarkerClick: null,
  onMarkerFocus: null,
  onMarkerHover: null,
  enableToggle: true,
  iconSrc: null,
  position: null,
  markerProps: {},
  onOpen: null,
  onClose: null,
  windowProps: {}
};
