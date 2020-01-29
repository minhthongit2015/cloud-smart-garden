import DialogTypes from './DialogTypes';
import PostDetails from '../../../components/blog-base/post-details/PostDetails';
import PageDialog from '../../../components/dialogs/PageDialog';
import LoginDialog from '../../../components/dialogs/LoginDialog';
import MessageDialog from '../../../components/dialogs/MessageDialog';
import GuideDialog from '../../../components/dialogs/GuideDialog';
import ExperimentDetailsPage from '../../../pages/AI-Cloud/tab-experiments/experiment-details/ExperimentDetailsPage';


export default {
  [DialogTypes.login]: LoginDialog,
  [DialogTypes.message]: MessageDialog,
  [DialogTypes.guide]: GuideDialog,
  [DialogTypes.post]: { content: PostDetails, dialog: PageDialog },
  [DialogTypes.experiment]: { content: ExperimentDetailsPage, dialog: PageDialog }
};
