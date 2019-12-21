import RouteConstants from '../../utils/RouteConstants';
import TabAICloud from './tab-ai-cloud/TabAICloud';
import TabProjects from './tab-projects/TabProjects';
import TabExperiments from './tab-experiments/TabExperiments';
import TabDatasets from './tab-datasets/TabDatasets';
import TabTrainedModels from './tab-trained-models/TabTrainedModels';
import MainPageGroup from '../_base/MainPageGroup';
import t from '../../languages';


export default class extends MainPageGroup {
  constructor(props) {
    super(props);
    this.brand = {
      name: t('pages.aiCloud.nav.aiCloud'),
      link: RouteConstants.aiCloudLink,
      path: RouteConstants.aiCloudPath,
      component: TabAICloud
    };
    this.tabs = [
      {
        name: t('pages.aiCloud.nav.projects'),
        link: RouteConstants.aiProjectsLink,
        path: RouteConstants.aiProjectsPath,
        component: TabProjects
      },
      {
        name: t('pages.aiCloud.nav.experiments'),
        link: RouteConstants.aiExperimentsLink,
        path: RouteConstants.aiExperimentsPath,
        component: TabExperiments
      },
      {
        name: t('pages.aiCloud.nav.trainedModels'),
        link: RouteConstants.aiModelsLink,
        path: RouteConstants.aiModelsPath,
        component: TabTrainedModels
      },
      {
        name: t('pages.aiCloud.nav.datasets'),
        link: RouteConstants.aiDatasetsLink,
        path: RouteConstants.aiDatasetsPath,
        component: TabDatasets
      }
    ];
  }
}
