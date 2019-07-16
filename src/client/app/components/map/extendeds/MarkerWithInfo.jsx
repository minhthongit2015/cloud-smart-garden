import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import * as jQuery from 'jquery';
import uuid from 'uuid';
import { mapTreeNodeToArray } from '../../../utils/DOM';

class MarkerWithInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: null
    };
    this.markerRef = React.createRef();
    this.windowRef = React.createRef();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.onMarkerFocus = this.onMarkerFocus.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.uid = uuid.v1();
  }

  open() {
    this.setState({
      marker: this.markerRef
    });
  }

  close() {
    this.setState({
      marker: null
    });
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

  onMarkerClick(props, marker) {
    if (this.props.enableToggle) {
      this.setState(prevState => ({
        marker: prevState.marker ? null : marker
      }));
    } else if (!this.state.marker) {
      this.setState({
        marker
      });
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

  render() {
    const {
      google, map, markerProps, windowProps
    } = this.props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this._nodeMap = [];
    mapTreeNodeToArray(this.props.children, this._nodeMap);
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
          onClose={this.onClose}
          visible={!!this.state.marker}
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

export default MarkerWithInfo;
