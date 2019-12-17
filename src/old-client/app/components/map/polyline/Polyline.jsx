import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Polyline as BasePolyline } from 'google-maps-react';

export default class Polyline extends Component {
  get rootLine() {
    return this.lineRef.current.polyline;
  }

  constructor(props) {
    super(props);
    this.lineRef = React.createRef();
  }

  setPath(path) {
    this.rootLine.setPath(path);
  }

  render() {
    console.log('render "Polyline.jsx"');

    const {
      google, map, path,
      color, opacity, width,
      ...rest
    } = this.props;
    if (!google || !map) return null;
    const baseProps = { google, map };

    return (
      <BasePolyline
        {...baseProps}
        {...rest}
        ref={this.lineRef}
        path={path}
        strokeColor={color}
        strokeOpacity={opacity}
        strokeWeight={width}
        geodesic
      />
    );
  }
}

Polyline.propTypes = {
  google: PropTypes.object,
  map: PropTypes.object,
  path: PropTypes.array,
  color: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number
};

Polyline.defaultProps = {
  google: null,
  map: null,
  path: [],
  color: '#00ffff',
  opacity: 0.8,
  width: 2
};
