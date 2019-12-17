import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabWhatYouCanDo from './tab-what-you-can-do/TabWhatYouCanDo';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import TabSupporting from './tab-supporting/TabSupporting';
import TabWorldActions from './tab-world-actions/TabWorldActions';
import TabCommunityRecommend from './tab-community-recommend/TabCommunityRecommend';
import t from '../../languages';
import { IconCommunity } from '../../../assets/icons';
import TabGretaThunberg from './tab-Greta-Thunberg/TabGretaThunberg';
import NewsTracker from '../../services/NewsTracker';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.whatYouCanDo.nav.main'),
      link: RouteConstants.whatYouCanDoLink
    };
    this.tabs = [
      {
        name: t('pages.whatYouCanDo.nav.climate'),
        path: RouteConstants.doForClimatePath,
        link: RouteConstants.doForClimateLink,
        component: TabClimate,
        category: 'DoForClimate'
      },
      {
        name: t('pages.whatYouCanDo.nav.organisms'),
        path: RouteConstants.doForOrganismsPath,
        link: RouteConstants.doForOrganismsLink,
        component: TabOrganisms,
        category: 'DoForOrganisms'
      },
      {
        name: t('pages.whatYouCanDo.nav.pollution'),
        path: RouteConstants.doForPollutionPath,
        link: RouteConstants.doForPollutionLink,
        component: TabPollution,
        category: 'DoForPollution'
      },
      {
        name: t('pages.whatYouCanDo.nav.supporting'),
        shortName: t('pages.whatYouCanDo.nav.supportingShort'),
        path: RouteConstants.doSupportingPath,
        link: RouteConstants.doSupportingLink,
        component: TabSupporting,
        category: 'DoSupporting'
      },
      {
        name: t('pages.whatYouCanDo.nav.worldActions'),
        shortName: t('pages.whatYouCanDo.nav.worldActionsShort'),
        path: RouteConstants.worldActionsPath,
        link: RouteConstants.worldActionsLink,
        component: TabWorldActions,
        category: 'WorldActions'
      },
      {
        name: t('pages.whatYouCanDo.nav.GretaThunberg'),
        path: RouteConstants.GretaThunbergPath,
        link: RouteConstants.GretaThunbergLink,
        component: TabGretaThunberg,
        category: 'GretaThunberg'
      },
      {
        name: <IconCommunity text={t('pages.whatYouCanDo.nav.communityRecommend')} />,
        path: RouteConstants.communityRecommendPath,
        link: RouteConstants.communityRecommendLink,
        component: TabCommunityRecommend,
        category: 'CommunityRecommend'
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
            <Route key={tab.name} exact path={tab.path} component={tab.component} />
          ))}
          <Route exact path={RouteConstants.whatYouCanDoPath} component={TabWhatYouCanDo} />
          <Redirect to={RouteConstants.whatYouCanDoLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
