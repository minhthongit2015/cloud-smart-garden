import DialogTypes from './DialogTypes';
import PostDetails from '../../../components/blog-base/post-details/PostDetails';
import PageDialog from '../../../components/dialogs/PageDialog';
import LoginDialog from '../../../components/dialogs/LoginDialog';
import MessageDialog from '../../../components/dialogs/MessageDialog';
import GuideDialog from '../../../components/dialogs/GuideDialog';
import ExperimentPage from '../../../pages/AI-Cloud/tab-experiments/experiment-details/ExperimentPage';
import DatasetPage from '../../../pages/AI-Cloud/tab-datasets/dataset-details/DatasetDetailsPage';
import AddNewPlantDialog from '../../../pages/my-garden/parts/AddNewPlantDialog';
import PlantDetailsPage from '../../../pages/plant-library/tab-plant-library/PlantDetailsPage';
import { ModelName } from '../../../utils/Constants';


export default {
  [DialogTypes.login]: LoginDialog,
  [DialogTypes.message]: MessageDialog,
  [DialogTypes.guide]: GuideDialog,

  [ModelName.post]: { content: PostDetails, dialog: PageDialog },
  [ModelName.experiment]: { content: ExperimentPage, dialog: PageDialog },
  [ModelName.dataset]: { content: DatasetPage, dialog: PageDialog },
  [DialogTypes.addNewPlant]: AddNewPlantDialog,
  [ModelName.plant]: { content: PlantDetailsPage, dialog: PageDialog }
};
