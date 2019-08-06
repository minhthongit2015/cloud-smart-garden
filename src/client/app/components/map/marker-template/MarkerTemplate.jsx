import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './MarkerTemplate.scss';

import { FarmSrc } from '../../../../assets/icons';

const CUSTOM_CLASS = 'template';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;


export default class MarkerTemplate extends Component {
  get uid() {
    return this.marker.uid;
  }

  constructor(props) {
    super(props);
    this.marker = null;
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad(ref) {
    this.marker = ref;
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

  render() {
    const { name } = this.props;
    return (
      <MarkerWithInfo
        {...this.props}
        ref={this.markerRef}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
      >
        <h4>Hello {name}</h4>
      </MarkerWithInfo>
    );
  }
}

MarkerTemplate.propTypes = {
  iconSrc: PropTypes.string
};

MarkerTemplate.defaultProps = {
  iconSrc: FarmSrc
};
