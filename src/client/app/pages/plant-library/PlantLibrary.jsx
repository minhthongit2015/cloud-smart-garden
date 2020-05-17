import t from '../../languages';
import MainPageGroup from '../_base/MainPageGroup';
import RouteConstants from '../../utils/RouteConstants';
import TabPlantLibrary from './tab-plant-library/TabPlantLibrary';


export default class PlantLibrary extends MainPageGroup {
  constructor(props) {
    super(props, t('pages.plantLibrary.title.plantLibrary'));
    this.brand = {
      name: t('pages.plantLibrary.nav.plantLibrary'),
      link: RouteConstants.plantLibraryLink,
      path: RouteConstants.plantLibraryPath,
      component: TabPlantLibrary
    };
    this.tabs = [
      {
        name: t('Rau'),
        link: RouteConstants.vegetableLink,
        path: RouteConstants.vegetablePath,
        component: TabPlantLibrary
      },
      {
        name: t('Củ'),
        link: RouteConstants.tubersLink,
        path: RouteConstants.tubersPath,
        component: TabPlantLibrary
      },
      {
        name: t('Quả'),
        link: RouteConstants.fruitsLink,
        path: RouteConstants.fruitsPath,
        component: TabPlantLibrary
      },
      {
        name: t('Hoa'),
        link: RouteConstants.flowersLink,
        path: RouteConstants.flowersPath,
        component: TabPlantLibrary
      },
      {
        name: t('Nấm'),
        link: RouteConstants.mushroomsLink,
        path: RouteConstants.mushroomsPath,
        component: TabPlantLibrary
      }
    ];
  }
}
