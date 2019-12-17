import React, { Component } from 'react';
import './Content.scss';

export default class Body extends Component {
  render() {
    console.log('render "Layouts/sidebar-layout/content/Content.jsx"');
    return (
      <article className="sidebar-layout__content flex-fill">
        {this.props.children}
      </article>
    );
  }
}
