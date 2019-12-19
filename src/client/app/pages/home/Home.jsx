import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import UserService from '../../services/user/UserService';
import RouteConstants from '../../utils/RouteConstants';
import {
  IconMyGarden,
  IconSmileCity,
  IconAICloud,
  IconEarthPicture
} from '../../../assets/icons';

import NavIconLink from '../../components/utils/nav-icon-link/NavIconLink';
import t from '../../languages';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props, 'Beyond Garden', true);
    this.links = [
      {
        type: 'nav',
        link: RouteConstants.userGardensLink,
        text: t('pages.home.nav.myGarden'),
        textStyle: {
          marginTop: '-10px',
          marginBottom: '2px'
        },
        icon: IconMyGarden
      },
      {
        type: 'nav',
        link: RouteConstants.userNetworkLink,
        text: t('pages.home.nav.userNetwork'),
        textStyle: {
          marginTop: '-10px',
          marginBottom: '2px'
        },
        icon: IconSmileCity
      },
      {
        type: 'nav',
        link: RouteConstants.aiCloudLink,
        text: t('pages.home.nav.aiCloud'),
        textStyle: {
          marginTop: '-10px',
          marginBottom: '2px'
        },
        icon: IconAICloud
      },
      {
        type: 'nav',
        link: RouteConstants.nextFeaturesLink,
        text: t('pages.home.nav.nextFeatures'),
        textStyle: {
          marginTop: '-10px',
          marginBottom: '2px'
        },
        icon: IconEarthPicture
      }
    ];

    // if (window.location.port === '') {
    //   this.links.splice(1, 1);
    // }

    UserService.useFbProfileState(this);
  }

  renderNav(nav) {
    const colMd = 12 / this.links.length;
    const colSm = colMd === 4 ? 4 : 4;
    return (
      <div className={`col-12 col-sm-${colSm} col-md-${colMd} p-0`} key={nav.link}>
        <NavIconLink
          nav={nav}
          ratio={1}
          className="my-0"
          imageWrapperClass="col-3 col-xs-8 col-sm-10 p-0 mx-auto"
        />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomQuote(name) {
    const now = new Date();
    if (now.getHours() >= 1 && now.getHours() <= 11) {
      return `Chào buổi sáng... ${name}! Chúc một ngày mới vui vẻ!`;
    } if (now.getHours() >= 13 && now.getHours() <= 17) {
      return `Chào buổi chiều... ${name}`;
    } if (now.getHours() >= 18 && now.getHours() <= 23) {
      return `Chào buổi tối... ${name}`;
    }
    return '';
  }

  render() {
    const { fbProfile } = UserService;
    return (
      <div className="h-100 d-flex justify-content-center align-items-center overflow-hidden">
        <div className="d-flex flex-column col-lg-8 col-md-10 col-sm-12 col-xs-12 col-12 p-0">
          <div className="text-center text-light px-2 mb-0 mb-sm-3">
            {t('pages.home.mainMessage')}
          </div>
          <div className="home-nav d-flex flex-column flex-sm-row align-items-center">
            {
              this.links.map((link) => {
                if (link.type === 'nav') {
                  return this.renderNav(link);
                }
                return null;
              })
            }
          </div>
          {fbProfile && (
            <div className="text-center text-light mt-2 mt-xs-3 mt-sm-5 px-3 px-md-5">
              {this.getRandomQuote(fbProfile.short_name)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
