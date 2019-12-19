import React from 'react';
import RouteConstants from '../../utils/RouteConstants';
import t from '../../languages';
import OneHundredQuotes from './tab-100-Quotes/Tab100Quotes';
import PageGroup from '../_base/PageGroup';
import TabIntranet from './tab-intranet/TabIntranet';
import TabMembers from './tab-members/TabMembers';


export default class extends PageGroup {
  constructor(props) {
    super(props, null, true);
    this.brand = {
      name: t('pages.intranet.nav.intranet'),
      link: RouteConstants.intranetLink,
      path: RouteConstants.intranetPath,
      component: TabIntranet
    };
    this.tabs = [
      {
        name: <b>{t('pages.intranet.nav.oneHundredQuotes')}</b>,
        path: RouteConstants.oneHundredQuotesPath,
        link: RouteConstants.oneHundredQuotesLink,
        component: OneHundredQuotes
      }, {
        name: t('pages.intranet.nav.memberSpotlight'),
        path: RouteConstants.membersPath,
        link: RouteConstants.membersLink,
        component: TabMembers
      }
    ];
  }
}
