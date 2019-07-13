import React, { Component } from 'react';
import './content.scss';

export default class Body extends Component {
  render() {
    return (
      <article id="body" className="flex-fill h-100">
        {this.props.children}
      </article>
    );
  }
}
