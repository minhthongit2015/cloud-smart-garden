import React from 'react';

import RouteConstants from '../../utils/RouteConstants';
import t from '../../languages';
import BlogPage from '../_base/BlogPage';
import BlogPageContent from '../_base/BlogPageContent';


export default class extends BlogPage {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.yourQuestion.nav.main'),
      link: RouteConstants.nextFeaturesLink,
      path: RouteConstants.nextFeaturesPath,
      render: propsz => <BlogPageContent rootCategory="NextFeature" {...propsz} />
    };
    this.tabs = [
      {
        name: t('pages.yourQuestion.nav.climate'),
        path: RouteConstants.nextTechPath,
        link: RouteConstants.nextTechLink,
        render: propsz => <BlogPageContent categories="NextTech" {...propsz} />
      }, {
        name: t('pages.yourQuestion.nav.climate'),
        path: RouteConstants.nextSpeciesPath,
        link: RouteConstants.nextSpeciesLink,
        render: propsz => <BlogPageContent categories="NextSpecies" {...propsz} />
      }
    ];
  }
}
