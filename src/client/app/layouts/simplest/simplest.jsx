import React, { Component } from 'react';
import Content from './content/content';
import SideNav from './sidenav/sidenav';

export default class SimplestLayout extends Component {
  render() {
    return (
      <div className="d-flex">
        <Content>
          {this.props.routes}
        </Content>
        <SideNav />
      </div>
    );
  }
}
