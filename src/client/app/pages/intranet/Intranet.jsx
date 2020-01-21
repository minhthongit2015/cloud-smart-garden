import React from 'react';
import RouteConstants from '../../utils/RouteConstants';
import t from '../../languages';
import OneHundredQuotes from './tab-100-Quotes/Tab100Quotes';
import MainPageGroup from '../_base/MainPageGroup';
import TabIntranet from './tab-intranet/TabIntranet';
import TabMembers from './tab-members/TabMembers';
import TabNextLevel from './tab-next-level/TabNextLevel';
import UserService from '../../services/user/UserService';
import { IconFeatherPen } from '../../../assets/icons';


export default class extends MainPageGroup {
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
        name: <b><IconFeatherPen /> {t('pages.intranet.nav.oneHundredQuotes')}</b>,
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

    const nextLevelTab = {
      name: t('pages.intranet.nav.nextLevel'),
      path: RouteConstants.nextLevelPath,
      link: RouteConstants.nextLevelLink,
      component: TabNextLevel
    };
    if (UserService.isMember) {
      this.tabs.push(nextLevelTab);
    }
    UserService.useUserState(this, false, () => {
      if (UserService.isMember) {
        if (!this.tabs.find(tab => tab === nextLevelTab)) {
          this.tabs.push(nextLevelTab);
        }
      } else {
        const index = this.tabs.findIndex(tab => tab === nextLevelTab);
        if (index >= 0) {
          this.tabs.splice(index, 1);
        }
      }
    });
  }
}
