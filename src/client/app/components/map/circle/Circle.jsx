/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import BaseCircle from './BaseCircle';

export default class extends React.PureComponent {
  render() {
    const {
      google, map, center, radius, marker, ...restProps
    } = this.props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    return (
      <BaseCircle
        {...baseProps}
        center={center}
        radius={radius}
        onMouseover={() => console.log('mouseover')}
        onClick={() => marker.toggle()}
        onMouseout={() => console.log('mouseout')}
        strokeColor="#fff"
        strokeOpacity={0}
        strokeWeight={5}
        fillColor="#FF0000"
        fillOpacity={0.2}
        {...restProps}
      />
    );
  }
}
