import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './SupplierMarker.scss';

import { SupplierSrc } from '../../../assets/icons';

const CUSTOM_MARKER_CLASS = 'farm-marker-window';


export default class SupplierMarker extends Component {
  get marker() {
    return this.markerRef.current;
  }

  constructor(props) {
    super(props);

    this.markerRef = React.createRef();
    this.onStartConversation = this.onStartConversation.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onOpen() {
    this.marker.infoWindowWrapper.addClass(CUSTOM_MARKER_CLASS);
  }

  open() {
    this.marker.open();
  }

  close() {
    this.marker.close();
  }

  toggle() {
    this.marker.toggle();
  }

  onStartConversation() {
    alert(`Hello Guy! I'm ${this.props.name}`);
  }

  render() {
    const { name } = this.props;
    return (
      <MarkerWithInfo ref={this.markerRef} {...this.props} onOpen={this.onOpen}>
        <h4>Nông trại {name}</h4>
      </MarkerWithInfo>
    );
  }
}

SupplierMarker.propTypes = {
  iconSrc: PropTypes.string
};

SupplierMarker.defaultProps = {
  iconSrc: SupplierSrc
};
