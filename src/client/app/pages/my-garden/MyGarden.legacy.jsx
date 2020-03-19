import t from '../../languages';
import MainPageGroup from '../_base/MainPageGroup';
import RouteConstants from '../../utils/RouteConstants';
import TabMyGarden from './tab-my-garden/TabMyGarden';
import TabStorehouse from './tab-storehouse/TabStorehouse';
import TabHelp from './tab-help/TabHelp';
import TabStations from './tab-stations/TabStations';


export default class extends MainPageGroup {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.myGarden.nav.myGarden'),
      link: RouteConstants.myGardenLink,
      path: RouteConstants.myGardenPath,
      component: TabMyGarden
    };
    this.tabs = [
      {
        name: t('pages.myGarden.nav.stations'),
        path: RouteConstants.stationsPath,
        link: RouteConstants.stationsLink,
        component: TabStations
      },
      {
        name: t('pages.myGarden.nav.storehouse'),
        path: RouteConstants.storehousePath,
        link: RouteConstants.storehouseLink,
        component: TabStorehouse
      },
      {
        name: t('pages.myGarden.nav.help'),
        path: RouteConstants.helpMyGardenPath,
        link: RouteConstants.helpMyGardenLink,
        component: TabHelp
      }
    ];
  }
}
