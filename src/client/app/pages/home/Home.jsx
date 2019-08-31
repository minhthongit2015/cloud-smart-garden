import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

import RouteConstants from '../../utils/RouteConstants';
import {
  MyGardenSrc,
  AICloudSrc,
  SmileCitySrc
} from '../../../assets/icons';

import NavIconLink from '../../components/nav-icon-link/NavIconLink';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Home';
    this.links = [
      {
        type: 'nav', link: RouteConstants.aiCloudLink, text: 'AI Cloud', iconSrc: AICloudSrc
      },
      {
        type: 'nav', link: RouteConstants.userGardensLink, text: 'My Garden', iconSrc: MyGardenSrc
      },
      {
        type: 'nav', link: RouteConstants.userNetworkLink, text: 'Smile City', iconSrc: SmileCitySrc
      }
    ];
  }

  static renderNav(nav) {
    return (
      <div className="col-4" key={nav.link}>
        <NavIconLink nav={nav} ratio={1} />
      </div>
    );
  }

  render() {
    console.log('render "Pages/home/Home.jsx"');
    return (
      <React.Fragment>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex col-lg-6 col-md-8 col-sm-10 col-xs-12 col-12">
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
