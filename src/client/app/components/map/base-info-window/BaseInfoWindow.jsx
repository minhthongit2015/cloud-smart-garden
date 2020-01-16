/* eslint-disable class-methods-use-this */
import React from 'react';
import ReactDOM from 'react-dom';
import * as jQuery from 'jquery';
import { InfoWindow } from 'google-maps-react';
import BaseComponent from '../../BaseComponent';
import './BaseInfoWindow.scss';


export default class extends BaseComponent.Pure {
  get customClass() {
    return this.props.customClass || 'custom';
  }

  get windowClass() {
    return `${this.customClass}-info-window`;
  }

  get infoWindowTopMost() {
    return this.infoWindowWrapper.parent();
  }

  get infoWindowWrapper() {
    return jQuery(document.getElementById(this.id)).parents('.gm-style-iw-a');
  }

  get allInfoWindowTopElements() {
    return jQuery('.gm-style .gm-style-iw-a').parents('');
  }

  get isFocused() {
    return this.infoWindowTopMost.hasClass('focused');
  }

  get isReallyOpen() {
    return this.isOpen && !this.isClosing && this.infoWindowTopMost.length > 0;
  }

  get isOpen() {
    return this.state && !!this.state.marker;
  }

  constructor(props) {
    super(props);
    this.bind(this.handleOpen, this.handleClose, this.focus);
    this.windowRef = React.createRef();
    this.state = {
      marker: null
    };
  }

  open() {
    this.setState({
      marker: this.props.marker
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
    this.dispatchEvent(this.Events.close, this);
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
    this.dispatchEvent(this.Events.toggle, this);
  }

  focus() {
    this.isClosing = false;
    this.allInfoWindowTopElements.removeClass('focused');
    this.infoWindowTopMost.addClass('focused');
    this.dispatchEvent(this.Events.focus, this);
  }

  refresh() {
    this.forceUpdate(() => {
      this.windowRef.current.updateContent();
    });
  }

  handleOpen() {
    this.infoWindowTopMost.addClass(this.windowClass);
    this.infoWindowWrapper.addClass(this.windowClass);
    this.focus();
    ReactDOM.render(this.renderContent(), document.getElementById(this.id));
    this.infoWindowWrapper.on('click', this.focus);
    this.dispatchEvent(this.Events.open);
  }

  handleClose() {
    this.isClosing = false;
    this.setState({
      marker: null
    });
    this.dispatchEvent(this.Events.close);
  }

  renderContent() {
    return (this.props.renderContent && this.props.renderContent())
      || this.props.children;
  }

  render() {
    const {
      google, map
    } = this.props;
    if (!google || !map) return null;

    const { marker } = this.state;

    if (this.windowRef.current && marker
      && this.windowRef.current.infowindow.map === null) {
      this.windowRef.current.infowindow.marker = marker;
      this.windowRef.current.infowindow.setMap(map);
    }

    return (
      <InfoWindow
        ref={this.windowRef}
        google={google}
        map={map}
        marker={marker}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        visible={!!marker}
      >
        <div id={this.id} />
      </InfoWindow>
    );
  }
}
