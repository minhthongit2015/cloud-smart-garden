import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import uuid from 'uuid';
import { mapTreeNodeToArray } from '../../../utils/DOM';

export default class MarkerWithInfo extends Component {
  get isOpen() {
    return !!this.state.marker;
  }

  get infoWindowWrapper() {
    return jQuery(`#${this.uid}`).parents('.gm-style-iw-t');
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
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.uid = uuid.v1();
  }

  open() {
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
      this.close();
    } else {
      this.open();
    }
  }

  onOpen() {
    const root = jQuery(`#${this.uid}`);
    this._nodeMap.forEach((node) => {
      const child = root.find(`${node.selector}`);
      node.props.forEach(([key, value]) => {
        if (key.startsWith('on')) {
          child.on(key.substr(2).toLowerCase(), value);
        } else {
          child.attr(key, value);
        }
      });
    });
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
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover();
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

    this.storeContentOriginTree();
    const Content = () => (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Marker
          ref={this.markerRef}
          {...baseProps}
          onClick={this.onMarkerClick}
          onFocus={this.onMarkerFocus}
          onMouseover={this.onMarkerHover}
          {...markerProps}
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
  markerProps: {},
  onOpen: null,
  onClose: null,
  windowProps: {}
};
