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
      >
        <div className="d-flex waves-effect waves-light border border-info rounded m-2">
          <div><AICloudIcon draggable={false} /></div>
          <div><MyGardenIcon draggable={false} /></div>
          <div><SmileCityIcon draggable={false} /></div>
        </div>
      </NavLink>
    );
  }

  static renderNav(nav) {
    return <NavIconLink nav={nav} />;
  }

  render() {
    return (
      <aside
        className={
          classNames(
            'd-flex flex-column justify-content-center modern-scrollbar',
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
