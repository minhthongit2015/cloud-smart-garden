import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './sidenav.scss';
import SignIn from '../../../components/user/signin/SignIn';

import RouteConstants from '../../../utils/RouteConstants';
import {
  IconHome,
  IconMyGarden,
  IconSmileCity,
  IconAICloud,
  IconEarthPicture
} from '../../../../assets/icons';

import NavIconLink from '../../../components/utils/nav-icon-link/NavIconLink';
import t from '../../../languages';


export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        type: 'nav',
        link: RouteConstants.myGardenLink,
        text: t('pages.home.sideNav.myGarden'),
        icon: IconMyGarden
      },
      {
        type: 'nav',
        link: RouteConstants.userNetworkLink,
        text: t('pages.home.nav.userNetwork'),
        icon: IconSmileCity
      },
      {
        type: 'nav',
        link: RouteConstants.aiCloudLink,
        text: t('pages.home.nav.aiCloud'),
        icon: IconAICloud
      },
      {
        type: 'nav',
        link: RouteConstants.nextFeaturesLink,
        text: t('pages.home.nav.nextFeatures'),
        icon: IconEarthPicture
      }
    ];
    // if (window.location.port === '') {
    //   this.links.splice(1, 1);
    // }
  }

  static renderHomeNav() {
    const homeNav = {
      type: 'nav',
      link: RouteConstants.homeLink,
      icon: IconHome
    };
    return (
      <div className="w-100 text-center mb-0 mb-sm-2">
        <NavIconLink nav={homeNav} className="d-sm-none w-75" />
        <NavLink
          key="home"
          to={RouteConstants.homeLink}
          className="border-bottom border-light pb-2 w-100 d-none d-sm-block"
          draggable={false}
        >
          Trang Chủ
        </NavLink>
      </div>
    );
  }

  static renderNav(nav) {
    return <NavIconLink nav={nav} key={nav.link} spacing={10} />;
  }

  render() {
    return (
      <aside
        className={
          classNames(
            'sidenav',
            'd-flex flex-row flex-sm-column justify-content-center align-items-center',
            'modern-scrollbar-2 py-0 py-md-2',
            { hide: this.props.hide }
          )
        }
      >
        <div className="signin-button text-center">
          <SignIn />
        </div>
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
