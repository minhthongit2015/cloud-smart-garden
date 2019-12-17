import React, { Component } from 'react';
import './body.scss';

export default class Body extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
