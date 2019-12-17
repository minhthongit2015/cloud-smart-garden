import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './sidenav.scss';
import SignIn from '../../../components/user/signin/SignIn';

import RouteConstants from '../../../utils/RouteConstants';
import {
  IconEarthPictureStatic,
  IconWhatYouCanDo,
  IconYourQuestion,
  IconHome,
  IconEarth
} from '../../../../assets/icons';

import NavIconLink from '../../../components/utils/nav-icon-link/NavIconLink';


export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        type: 'nav',
        link: RouteConstants.earthPictureLink,
        text: 'Bức Tranh\r\nTrái Đất',
        icon: IconEarthPictureStatic
      },
      {
        type: 'nav',
        link: RouteConstants.theRealWorldLink,
        text: 'Thế Giới\r\nThực',
        icon: IconEarth
      },
      {
        type: 'nav',
        link: RouteConstants.whatYouCanDoLink,
        text: 'Điều Bạn\r\nCó Thể Làm',
        icon: IconWhatYouCanDo
      },
      {
        type: 'nav',
        link: RouteConstants.yourQuestionLink,
        text: 'Điều Bạn\r\nMuốn Biết?',
        icon: IconYourQuestion
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
        <NavIconLink nav={homeNav} className="d-sm-none" />
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
    return <NavIconLink nav={nav} key={nav.link} />;
  }

  render() {
    return (
      <aside
        className={
          classNames(
            'sidenav',
            'd-flex flex-row flex-sm-column justify-content-center align-items-center',
            'modern-scrollbar py-0 py-md-2',
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
