import React, { Component } from 'react';
import './SidebarLayout.scss';
import Content from './content/Content';
import Sidebar from './sidebar/Sidebar';

export default class SidebarLayout extends Component {
  render() {
    console.log('render "Layouts/simplest/Simplest.jsx"');
    return (
      <div className="sidebar-layout d-flex h-100">
        <Sidebar navItems={this.props.navItems} brand={this.props.brand} />
        <Content>
          {this.props.children}
        </Content>
      </div>
    );
  }
}
