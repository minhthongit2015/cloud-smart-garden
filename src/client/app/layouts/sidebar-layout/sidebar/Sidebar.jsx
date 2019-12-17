import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    const { brand } = this.props;
    return (
      <aside className="sidebar-layout__sidebar h-auto h-sm-75 d-flex flex-row flex-md-column flex-wrap justify-content-center p-1 p-md-3 pb-2 pb-md-5">
        {brand && (
          <div className="tab-title w-100">
            <NavLink exact to={brand.link}>{brand.name}</NavLink>
          </div>
        )}
        {this.props.navItems.map(item => (
          <div key={item.link}>
            <NavLink
              to={item.link}
              className={`ml-4 d-sm-none ${item.hasNews ? 'news' : ''}`}
            >{item.shortName || item.name}
            </NavLink>
            <NavLink
              to={item.link}
              className={`ml-4 d-none d-sm-inline ${item.hasNews ? 'news' : ''}`}
            >{item.name || item.shortName}
            </NavLink>
          </div>
        ))}
      </aside>
    );
  }
}
