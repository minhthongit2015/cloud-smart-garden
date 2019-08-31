import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    const { brand } = this.props;
    console.log('render "Layouts/sidebar-layout/sidebar/Sidebar.jsx"');
    return (
      <aside className="sidebar-layout__sidebar h-75 d-flex flex-column justify-content-center pb-5">
        {brand && (
          <div className="tab-title">
            <NavLink exact to={brand.link}>{brand.name}</NavLink>
          </div>
        )}
        {this.props.navItems.map(item => (
          <NavLink key={item.link} to={item.link}>{item.name}</NavLink>
        ))}
      </aside>
    );
  }
}
