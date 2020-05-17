/* eslint-disable max-len */
import React from 'react';
import DialogTypes from './DialogTypes';
import PageDialog from '../../../components/dialogs/PageDialog';
import LoginDialog from '../../../components/dialogs/LoginDialog';
import MessageDialog from '../../../components/dialogs/MessageDialog';
import GuideDialog from '../../../components/dialogs/GuideDialog';
import { ModelName, MarkerTypes } from '../../../utils/Constants';
import BaseEditingDialog from '../../../components/map-tools/edit-dialog/BaseEditingDialog';
import ExpertEditingDialog from '../../../components/map-tools/edit-dialog/ExpertEditingDialog';
import GardenEditingDialog from '../../../components/map-tools/edit-dialog/GardenEditingDialog';
import FarmEditingDialog from '../../../components/map-tools/edit-dialog/FarmEditingDialog';
import StoreEditingDialog from '../../../components/map-tools/edit-dialog/StoreEditingDialog';
import RestaurantEditingDialog from '../../../components/map-tools/edit-dialog/RestaurantEditingDialog';

// import PostDetails from '../../../components/blog-base/post-details/PostDetails';
// import ExperimentPage from '../../../pages/AI-Cloud/tab-experiments/experiment-details/ExperimentPage';
// import DatasetPage from '../../../pages/AI-Cloud/tab-datasets/dataset-details/DatasetDetailsPage';
// import PlantDetailsPage from '../../../pages/plant-library/tab-plant-library/PlantDetailsPage';
import AddNewPlantDialog from '../../../pages/my-garden/parts/AddNewPlantDialog';

const PostDetails = React.lazy(() => import('../../../components/blog-base/post-details/PostDetails'));
const ExperimentPage = React.lazy(() => import('../../../pages/AI-Cloud/tab-experiments/experiment-details/ExperimentPage'));
const DatasetPage = React.lazy(() => import('../../../pages/AI-Cloud/tab-datasets/dataset-details/DatasetDetailsPage'));
const PlantDetailsPage = React.lazy(() => import('../../../pages/plant-library/tab-plant-library/PlantDetailsPage'));


export default {
  [DialogTypes.login]: LoginDialog,
  [DialogTypes.message]: MessageDialog,
  [DialogTypes.guide]: GuideDialog,

  [ModelName.post]: { content: PostDetails, dialog: PageDialog },
  [ModelName.experiment]: { content: ExperimentPage, dialog: PageDialog },
  [ModelName.dataset]: { content: DatasetPage, dialog: PageDialog },
  [DialogTypes.addNewPlant]: AddNewPlantDialog,
  [ModelName.plant]: { content: PlantDetailsPage, dialog: PageDialog },

  [MarkerTypes.place]: BaseEditingDialog,
  [MarkerTypes.garden]: GardenEditingDialog,
  [MarkerTypes.farm]: FarmEditingDialog,
  [MarkerTypes.expert]: ExpertEditingDialog,
  [MarkerTypes.foodStore]: StoreEditingDialog,
  [MarkerTypes.toolStore]: StoreEditingDialog,
  [MarkerTypes.charityRestaurant]: RestaurantEditingDialog,
  [MarkerTypes.event]: BaseEditingDialog
};
