import RouteConstants from '../../utils/RouteConstants';
import TabAICloud from './tab-ai-cloud/TabAICloud';
import TabProjects from './tab-projects/TabProjects';
import TabExperiments from './tab-experiments/TabExperiments';
import TabDatasets from './tab-dataset/TabDataset';
import TabTrainedModels from './tab-trained-models/TabTrainedModels';
import PageGroup from '../_base/PageGroup';


export default class extends PageGroup {
  constructor(props) {
    super(props, 'AI Cloud');
    this.brand = {
      name: 'AI Cloud',
      link: RouteConstants.aiCloudLink,
      path: RouteConstants.aiCloudPath,
      component: TabAICloud
    };
    this.tabs = [
      {
        name: 'Projects',
        link: RouteConstants.aiProjectsLink,
        path: RouteConstants.aiProjectsPath,
        component: TabProjects
      },
      {
        name: 'Experiments',
        link: RouteConstants.aiExperimentsLink,
        path: RouteConstants.aiExperimentsPath,
        component: TabExperiments
      },
      {
        name: 'Trained Models',
        link: RouteConstants.aiModelsLink,
        path: RouteConstants.aiModelsPath,
        component: TabTrainedModels
      },
      {
        name: 'Dataset',
        link: RouteConstants.aiDatasetsLink,
        path: RouteConstants.aiDatasetsPath,
        component: TabDatasets
      }
    ];
  }
}
