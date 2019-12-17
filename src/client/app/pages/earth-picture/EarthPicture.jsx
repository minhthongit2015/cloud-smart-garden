import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabEarthPicture from './tab-earth-picture/TabEarthPicture';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import TabCommunityShare from './tab-community-share/TabCommunityShare';
import t from '../../languages';
import { IconCommunity } from '../../../assets/icons';
import NewsTracker from '../../services/NewsTracker';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.earthPicture.nav.main'),
      link: RouteConstants.earthPictureLink
    };
    this.tabs = [
      {
        name: t('pages.earthPicture.nav.climate'),
        path: RouteConstants.epClimatePath,
        link: RouteConstants.epClimateLink,
        component: TabClimate,
        category: 'Climate'
      },
      {
        name: t('pages.earthPicture.nav.organisms'),
        path: RouteConstants.epOrganismsPath,
        link: RouteConstants.epOrganismsLink,
        component: TabOrganisms,
        category: 'Organisms'
      },
      {
        name: t('pages.earthPicture.nav.pollution'),
        path: RouteConstants.epPollutionPath,
        link: RouteConstants.epPollutionLink,
        component: TabPollution,
        category: 'Pollution'
      },
      {
        name: <IconCommunity text={t('pages.earthPicture.nav.communityShare')} />,
        path: RouteConstants.epCommunitySharePath,
        link: RouteConstants.epCommunityShareLink,
        component: TabCommunityShare,
        category: 'CommunityShare'
      }
    ];

    NewsTracker.useNewsState(this);
  }

  render() {
    NewsTracker.mappingTabs(this.tabs);

    return (
      <SidebarLayout navItems={this.tabs} brand={this.brand}>
        <Switch>
          {this.tabs.map(tab => (
            <Route key={tab.name} path={tab.path} component={tab.component} />
          ))}
          <Route exact path={RouteConstants.earthPicturePath} component={TabEarthPicture} />
          <Redirect to={RouteConstants.earthPictureLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
