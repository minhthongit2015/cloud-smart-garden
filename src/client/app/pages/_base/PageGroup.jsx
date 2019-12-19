import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import BasePage from './BasePage';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import GuideMessage from '../../components/utils/messages/GuideMessage';


export default class extends BasePage {
  constructor(...args) {
    super(...args);
    this.brand = {
      name: 'Demo Page Group',
      link: RouteConstants.aiCloudLink,
      path: RouteConstants.aiCloudPath,
      render: props => (
        <GuideMessage {...props}>Demo Page Group</GuideMessage>
      )
    };
    this.tabs = new Array(4).fill(0).map(
      (value, index) => (
        {
          name: `Demo Page Group Content ${index + 1}`,
          link: RouteConstants.aiProjectsLink,
          path: RouteConstants.aiProjectsPath,
          render: props => (
            <GuideMessage {...props}>
              {`Demo Page Group Content ${index + 1}`}
            </GuideMessage>
          )
        }
      )
    );
  }

  render() {
    return (
      <SidebarLayout navItems={this.tabs} brand={this.brand}>
        <Switch>
          {this.tabs.map(tab => (
            <Route
              key={tab.name}
              path={tab.path}
              component={tab.component || (props => tab.render(props))}
            />
          ))}
          <Route
            exact
            path={this.brand.path}
            component={this.brand.component || (props => this.brand.render(props))}
          />
          <Redirect to={this.brand.link} />
        </Switch>
      </SidebarLayout>
    );
  }
}
