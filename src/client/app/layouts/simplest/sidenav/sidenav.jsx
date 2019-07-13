import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidenav.scss';

import RouteConstants from '../../../utils/RouteConstants';

import {
  MyGardenIcon,
  AICloudIcon,
  SmileCityIcon
} from '../../../assets/icons';

export default class SideNav extends Component {
  constructor() {
    super();
    this.links = [
      {
        type: 'nav', url: RouteConstants.aiCloudLink, text: 'AI Cloud', icon: AICloudIcon
      },
      {
        type: 'nav', url: RouteConstants.userGardensLink, text: 'My Garden', icon: MyGardenIcon
      },
      {
        type: 'nav', url: RouteConstants.userNetworkLink, text: 'Smile City', icon: SmileCityIcon
      }
    ];
  }

  static renderNav(nav) {
    return (
      <NavLink
        to={nav.url}
        key={nav.url}
        exact
        activeClassName="active"
      >
        {nav.text}
      </NavLink>
    );
  }

  render() {
    return (
      <aside className="d-flex flex-column modern-scrollbar">
        {
          this.links.map((link) => {
            if (link.type === 'nav') { return SideNav.renderNav(link); }
            return null;
          })
        }
      </aside>
    );
  }
}
