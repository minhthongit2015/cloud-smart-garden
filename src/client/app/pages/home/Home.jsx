import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import RouteConstants from '../../utils/RouteConstants';
import {
  MyGardenIcon,
  AICloudIcon,
  SmileCityIcon
} from '../../assets/icons';

import NavIconLink from '../../components/nav-icon-link/NavIconLink';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Home';
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
      <NavIconLink nav={nav} key={nav.url} />
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex w-50">
            {
              this.links.map((link) => {
                if (link.type === 'nav') {
                  return HomePage.renderNav(link);
                }
                return null;
              })
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
