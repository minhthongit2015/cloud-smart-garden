import React, { Component } from 'react';
import './content.scss';

export default class Body extends Component {
  render() {
    return (
      <article id="body">
        {this.props.children}
      </article>
    );
  }
}
