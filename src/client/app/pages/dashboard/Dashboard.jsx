import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabDashboard from './tab-dashboard/TabDashboard';
import t from '../../languages';
import TabCategories from './tab-categories/TabCategories';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.admin.nav.dashboard'),
      link: RouteConstants.dashboardLink
    };
    this.tabs = [
      {
        name: t('pages.admin.nav.categories'),
        path: RouteConstants.categoriesPath,
        link: RouteConstants.categoriesLink,
        component: TabCategories
      }
    ];
  }

  render() {
    return (
      <SidebarLayout navItems={this.tabs} brand={this.brand}>
        <Switch>
          {this.tabs.map(tab => (
            <Route key={tab.name} path={tab.path} component={tab.component} />
          ))}
          <Route exact path={RouteConstants.dashboardPath} component={TabDashboard} />
          <Redirect to={RouteConstants.dashboardLink} />
        </Switch>
      </SidebarLayout>
    );
  }
}
