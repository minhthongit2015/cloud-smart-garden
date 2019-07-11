import React, { Component } from 'react';

import { greatPlaceStyle } from './map_styles';

export default class MyGreatPlace extends Component {
  render() {
    return (
      <div style={greatPlaceStyle}>
        {this.props.text}
      </div>
    );
  }
}