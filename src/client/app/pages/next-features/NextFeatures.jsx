import React from 'react';

import RouteConstants from '../../utils/RouteConstants';
import t from '../../languages';
import BlogPage from '../_base/BlogPage';
import BlogPageContent from '../_base/BlogPageContent';


export default class extends BlogPage {
  constructor(propsz) {
    super(propsz);
    this.brand = {
      name: t('pages.nextFeatures.nav.nextFeatures'),
      link: RouteConstants.nextFeaturesLink,
      path: RouteConstants.nextFeaturesPath,
      render: props => (
        <BlogPageContent
          {...props}
          rootCategory="NextFeatures"
          title={t('pages.nextFeatures.title.nextFeatures')}
          guideMessage={t('pages.nextFeatures.message.nextFeatures')}
        />
      )
    };
    this.tabs = [
      {
        name: t('pages.nextFeatures.nav.nextTech'),
        path: RouteConstants.nextTechPath,
        link: RouteConstants.nextTechLink,
        render: props => (
          <BlogPageContent
            {...props}
            categories="NextTech"
            title={t('pages.nextFeatures.title.nextTech')}
            guideMessage={t('pages.nextFeatures.message.nextTech')}
          />
        )
      }, {
        name: t('pages.nextFeatures.nav.nextSpecies'),
        path: RouteConstants.nextSpeciesPath,
        link: RouteConstants.nextSpeciesLink,
        render: props => (
          <BlogPageContent
            {...props}
            categories="NextSpecies"
            title={t('pages.nextFeatures.title.nextSpecies')}
            guideMessage={t('pages.nextFeatures.message.nextSpecies')}
          />
        )
      }
    ];
  }
}
