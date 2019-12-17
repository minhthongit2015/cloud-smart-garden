import React, { Component } from 'react';
import './simplest.scss';
import Content from './content/content';
import SideNav from './sidenav/sidenav';
import RouteConstants from '../../utils/RouteConstants';

export default class SimplestLayout extends Component {
  render() {
    console.log('render "Layouts/simplest/Simplest.jsx"');
    return (
      <div className="simplest-layout simplest-theme d-flex h-100">
        <Content>
          {this.props.routes}
        </Content>
        <SideNav hide={window.location.pathname === RouteConstants.homeLink} />
      </div>
    );
  }
}
