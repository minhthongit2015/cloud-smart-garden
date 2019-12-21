import React from 'react';
import SubBlogPage from './SubBlogPage';

import RouteConstants from '../../utils/RouteConstants';
import MainPageGroup from './MainPageGroup';
import NewsTracker from '../../services/blog/NewsTracker';


export default class extends MainPageGroup {
  constructor(propsz) {
    super(propsz);

    // Just demo
    this.brand = {
      name: 'Demo Blog Page',
      link: RouteConstants.aiCloudLink,
      path: RouteConstants.aiCloudPath,
      render: props => <SubBlogPage rootCategory="DemoRootCategory" {...props} />
    };
    this.tabs = [
      {
        name: 'Demo Blog Page Content',
        link: RouteConstants.aiProjectsLink,
        path: RouteConstants.aiProjectsPath,
        render: props => <SubBlogPage categories="DemoCategories" {...props} />
      }
    ];
    NewsTracker.useNewsState(this);
  }

  render() {
    NewsTracker.mappingTabs(this.tabs);
    return super.render();
  }
}
