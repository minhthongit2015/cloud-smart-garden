import React, { Component } from 'react';
import './content.scss';

export default class Body extends Component {
  render() {
    console.log('render "Layouts/simplest/content/Content.jsx"');
    return (
      <article id="body" className="flex-fill h-100">
        {this.props.children}
      </article>
    );
  }
}
