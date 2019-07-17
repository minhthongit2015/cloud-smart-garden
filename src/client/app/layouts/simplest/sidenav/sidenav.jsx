import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './sidenav.scss';

import RouteConstants from '../../../utils/RouteConstants';
import {
  MyGardenIcon,
  AICloudIcon,
  SmileCityIcon
} from '../../../assets/icons';

import NavIconLink from '../../../components/nav-icon-link/NavIconLink';

export default class SideNav extends Component {
  constructor(props) {
    super(props);
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

  static renderHomeNav() {
    return (
      <NavLink
        to={RouteConstants.homeLink}
        className="border-bottom border-light mx-3 pb-2"
        title="Home"
        draggable={false}
        key="home"
      >
        <div className="d-flex waves-effect waves-light border border-info rounded m-2">
          <div key="ai"><AICloudIcon /></div>
          <div key="garden"><MyGardenIcon /></div>
          <div key="city"><SmileCityIcon /></div>
        </div>
      </NavLink>
    );
  }

  static renderNav(nav) {
    return <NavIconLink nav={nav} key={nav.url} />;
  }

  render() {
    return (
      <aside
        className={
          classNames(
            'd-flex flex-column justify-content-center align-items-center modern-scrollbar',
            { hide: this.props.hide }
          )
        }
      >
        {SideNav.renderHomeNav()}
        {
          this.links.map((link) => {
            if (link.type === 'nav') {
              return SideNav.renderNav(link);
            }
            return null;
          })
        }
      </aside>
    );
  }
}
