import React, { Component } from 'react';
import {
  Marker, InfoWindow, MarkerProps, InfoWindowProps
} from 'google-maps-react';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';

class MarkerWithInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: null
    };
    this.markerRef = React.createRef();
    this.windowRef = React.createRef();
    this.windowEvent = new EventEmitter();
    this.markerEvent = new EventEmitter();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.onMarkerFocus = this.onMarkerFocus.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * @param {"click" | "dbclick"} event
   * @param {*} listener
   */
  addEventListener(event, listener) {
    if (!this.windowRef.current) {
      this.windowEvent.addListener(event, listener);
    } else {
      this.windowRef.current.addEventListener(event, listener);
    }
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
    this.windowEvent.eventNames().forEach((event) => {
      const listeners = this.windowEvent.listeners(event);
      listeners.forEach((listener) => {
        this.windowRef.current.addEventListener(event, listener);
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
    if (!this.state.marker) {
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
    const Content = props => (
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
          <Content />
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
  markerProps: PropTypes.shape(MarkerProps).isRequired,
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
  onOpen: null,
  onClose: null,
  windowProps: {}
};

export default MarkerWithInfo;
