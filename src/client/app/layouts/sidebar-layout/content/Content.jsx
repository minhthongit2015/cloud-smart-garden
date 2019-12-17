import React, { Component } from 'react';
import './Content.scss';

export default class Body extends Component {
  render() {
    return (
      <article className="sidebar-layout__content flex-fill" id="sidebar-layout__content">
        {this.props.children}
      </article>
    );
  }
}
