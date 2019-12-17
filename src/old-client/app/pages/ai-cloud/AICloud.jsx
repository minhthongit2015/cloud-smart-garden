/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BasePage from '../_base/BasePage';
import './AICloud.scss';

import SidebarLayout from '../../layouts/sidebar-layout/SidebarLayout';
import RouteConstants from '../../utils/RouteConstants';
import TabAICloud from './tab-ai-cloud/TabAICloud';
import TabProjects from './tab-projects/TabProjects';
import TabExperiments from './tab-experiments/TabExperiments';
import TabDatasets from './tab-dataset/TabDataset';
import TabTrainedModels from './tab-trained-models/TabTrainedModels';
import Test from '../../components/test';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'AI Cloud';
    this.brand = {
      name: 'AI Cloud',
      link: RouteConstants.aiCloudLink
    };
    this.tabs = [
      {
        name: 'Projects',
        link: RouteConstants.aiProjectsLink,
        path: RouteConstants.aiProjectsPath,
        component: TabProjects
      },
      {
        name: 'Experiments',
        link: RouteConstants.aiExperimentsLink,
        path: RouteConstants.aiExperimentsPath,
        component: TabExperiments
      },
      {
        name: 'Trained Models',
        link: RouteConstants.aiModelsLink,
        path: RouteConstants.aiModelsPath,
        component: TabTrainedModels
      },
      {
        name: 'Dataset',
        link: RouteConstants.aiDatasetsLink,
        path: RouteConstants.aiDatasetsPath,
        component: TabDatasets
      }
    ];
  }

  render() {
    return (
      <SidebarLayout navItems={this.tabs} brand={this.brand}>
        <Switch>
          {this.tabs.map(tab => (
            <Route key={tab.name} exact path={tab.path} component={tab.component} />
          ))}
          <Route path="/" component={TabAICloud} />
        </Switch>
        <Test>hello</Test>
      </SidebarLayout>
    );
  }
}
