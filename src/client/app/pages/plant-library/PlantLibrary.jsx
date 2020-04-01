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
      // {
      //   name: t('pages.aiCloud.nav.projects'),
      //   link: RouteConstants.aiProjectsLink,
      //   path: RouteConstants.aiProjectsPath,
      //   component: TabPlantLibrary
      // },
    ];
  }
}
