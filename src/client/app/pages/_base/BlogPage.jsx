import React from 'react';
import BlogPageContent from './BlogPageContent';

import RouteConstants from '../../utils/RouteConstants';
import PageGroup from './PageGroup';
import NewsTracker from '../../services/blog/NewsTracker';


export default class extends PageGroup {
  constructor(...args) {
    super(...args);
    this.brand = {
      name: 'Demo Blog Page',
      link: RouteConstants.aiCloudLink,
      path: RouteConstants.aiCloudPath,
      render: props => <BlogPageContent rootCategory="DemoRootCategory" {...props} />
    };
    this.tabs = [
      {
        name: 'Demo Blog Page Content',
        link: RouteConstants.aiProjectsLink,
        path: RouteConstants.aiProjectsPath,
        render: props => <BlogPageContent categories="DemoCategories" {...props} />
      }
    ];
    NewsTracker.useNewsState(this);
  }

  render() {
    NewsTracker.mappingTabs(this.tabs);
    return super.render();
  }
}
