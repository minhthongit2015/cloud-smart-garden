import React, { Component } from 'react';
import './SidebarLayout.scss';
import Content from './content/Content';
import Sidebar from './sidebar/Sidebar';

export default class SidebarLayout extends Component {
  render() {
    return (
      <div className="sidebar-layout d-flex flex-column flex-md-row h-100">
        <Sidebar navItems={this.props.navItems} brand={this.props.brand} />
        <Content>
          {this.props.children}
        </Content>
      </div>
    );
  }
}
