import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabYourQuestion from './tab-your-question/TabYourQuestion';
import TabOrganisms from './tab-organisms/TabOrganisms';
import TabClimate from './tab-climate/TabClimate';
import TabPollution from './tab-pollution/TabPollution';
import TabOthers from './tab-others/TabOthers';
import t from '../../languages';
import NewsTracker from '../../services/NewsTracker';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.yourQuestion.nav.main'),
      link: RouteConstants.yourQuestionLink
    };
    this.tabs = [
      {
        name: t('pages.yourQuestion.nav.climate'),
        path: RouteConstants.askForClimatePath,
        link: RouteConstants.askForClimateLink,
        component: TabClimate,
        category: 'AskForClimate'
      },
      {
        name: t('pages.yourQuestion.nav.organisms'),
        path: RouteConstants.askForOrganismsPath,
        link: RouteConstants.askForOrganismsLink,
        component: TabOrganisms,
        category: 'AskForOrganisms'
      },
      {
        name: t('pages.yourQuestion.nav.pollution'),
        path: RouteConstants.askForPollutionPath,
        link: RouteConstants.askForPollutionLink,
        component: TabPollution,
        category: 'AskForPollution'
      },
      {
        name: t('pages.yourQuestion.nav.others'),
        path: RouteConstants.askForOthersPath,
        link: RouteConstants.askForOthersPath,
        component: TabOthers,
        category: 'AskForOthers'
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
          <Route exact path={RouteConstants.yourQuestionPath} component={TabYourQuestion} />
          <Redirect to={RouteConstants.yourQuestionLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
