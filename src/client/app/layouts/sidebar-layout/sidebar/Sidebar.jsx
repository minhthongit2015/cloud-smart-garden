import React from 'react';
import { NavLink } from 'react-router-dom';
import pathMatch from 'path-match';
import './Sidebar.scss';

import { isFunction } from '../../../utils';

const getMathcher = pathMatch({
  sensitive: false,
  strict: false,
  end: false
});


export default class Sidebar extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  buildItemLink(item) {
    if (isFunction(item.link)) {
      const matcher = getMathcher(item.path);
      const params = matcher(window.location.pathname);
      return item.link(...Object.values(params));
    }
    return item.link;
  }

  renderNavItem(item) {
    const itemLink = this.buildItemLink(item);
    if (!itemLink) return null;
    return (
      <div key={itemLink}>
        <NavLink
          to={itemLink}
          className={`ml-4 d-sm-none ${item.hasNews ? 'news' : ''}`}
          exact
        >{item.shortName || item.name}
        </NavLink>
        <NavLink
          to={itemLink}
          className={`ml-4 d-none d-sm-inline ${item.hasNews ? 'news' : ''}`}
          exact
        >{item.name || item.shortName}
        </NavLink>
      </div>
    );
  }

  render() {
    const { brand } = this.props;
    return (
      <aside className="sidebar-layout__sidebar h-auto h-sm-75 d-flex flex-row flex-md-column flex-wrap justify-content-center p-1 p-md-3 pb-2 pb-md-5">
        {brand && (
          <div className="tab-title w-100">
            <NavLink exact to={brand.link}>{brand.name}</NavLink>
          </div>
        )}
        {this.props.navItems.map(item => this.renderNavItem(item))}
      </aside>
    );
  }
}
