/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import Circle from './Circle';
import BaseComponent from '../../_base/BaseComponent';


export default class BaseCircle extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleClick, this.handleMouseEnter, this.handleMouseLeave);
  }

  handleClick() {
    this.dispatchEvent(this.Events.click, this);
  }

  handleMouseEnter() {
    this.dispatchEvent(this.Events.mouseEnter, this);
  }

  handleMouseLeave() {
    this.dispatchEvent(this.Events.mouseLeave, this);
  }

  render() {
    const {
      google, map, center, radius, marker, ...restProps
    } = this.props;
    if (!google || !map) return null;

    return (
      <Circle
        google={google}
        map={map}
        center={center}
        radius={radius}
        strokeColor="#fff"
        strokeOpacity={0}
        strokeWeight={5}
        fillColor="#FF0000"
        fillOpacity={0.2}
        {...restProps}
        onClick={this.handleClick}
        onMouseover={this.handleMouseEnter}
        onMouseout={this.handleMouseLeave}
      />
    );
  }
}
