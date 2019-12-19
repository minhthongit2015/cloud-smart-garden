/* eslint-disable max-len */
import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalState from './utils/GlobalState';
import LeafLoading from './components/utils/loadings/LeafLoading';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';

import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import SimplestLayout from './layouts/simplest/simplest';

import superws from './utils/superws';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';

import AuthService from './services/user/Auth';
import PageDialogHelper from './helpers/dialogs/PageDialogHelper';
import LoginDialogHelper from './helpers/dialogs/LoginDialogHelper';
import MessageDialogHelper from './helpers/dialogs/MessageDialogHelper';

import PageDialog from './components/dialog/PageDialog';
import LoginDialog from './components/dialog/LoginDialog';
import MessageDialog from './components/dialog/MessageDialog';
import GuideDialog from './components/dialog/GuideDialog';

import SavedPostsDialogHelper from './helpers/dialogs/SavedPostsDialogHelper';
import IDoPostsDialogHelper from './helpers/dialogs/IDoPostsDialogHelper';
import GuideDialogHelper from './helpers/dialogs/GuideDialogHelper';
import PostDetailsDialogHelper from './helpers/dialogs/PostDetailsDialogHelper';

import EditPlaceDialogHelper from './helpers/dialogs/EditPlaceDialogHelper';
import DisasterDialog from './components/map-tools/edit-dialog/DisasterDialog';
import ExtinctionDialog from './components/map-tools/edit-dialog/ExtinctionDialog';
import StrikeDialog from './components/map-tools/edit-dialog/StrikeDialog';
import ActionDialog from './components/map-tools/edit-dialog/ActionDialog';
import ActivistDialog from './components/map-tools/edit-dialog/ActivistDialog';

import DummyUserNetwork from './pages/user-network/DummyUserNetwork';

const HomePage = React.lazy(() => import('./pages/home/Home'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Intranet = React.lazy(() => import('./pages/intranet/Intranet'));
const AICloud = React.lazy(() => import('./pages/AI-Cloud/AICloud'));
const MyGarden = React.lazy(() => import('./pages/my-garden/MyGarden'));
const NextFeatures = React.lazy(() => import('./pages/next-features/NextFeatures'));
const UserNetwork = React.lazy(() => import('./pages/user-network/UserNetwork'));

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isUserNetwork() {
    return window.location.pathname === RouteConstants.userNetworkPath;
  }

  constructor(props) {
    super(props);
    GlobalState.init();
    GlobalState.loadState();
    superws.init();
    AuthService.init();

    EditPlaceDialogHelper.storeDialog([
      ActivistDialog, DisasterDialog, ExtinctionDialog, ActionDialog, StrikeDialog
    ]);

    KeyTracker();
  }

  render() {
    const routes = (
      <React.Suspense fallback={<LeafLoading overlaping text="Beyond Garden" />}>
        <Switch>
          <Route exact path={RouteConstants.homePath} component={props => <HomePage {...props} />} />
          <Route path={RouteConstants.adminPath} component={props => <Dashboard {...props} />} />
          <Route path={RouteConstants.intranetPath} component={props => <Intranet {...props} />} />
          <Route path={RouteConstants.aiCloudPath} component={props => <AICloud {...props} />} />
          <Route path={RouteConstants.userGardensPath} component={props => <MyGarden {...props} />} />
          <Route path={RouteConstants.nextFeaturesPath} component={props => <NextFeatures {...props} />} />
          <Route exact path={RouteConstants.userNetworkPath} component={props => <DummyUserNetwork {...props} />} />
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isUserNetwork || window.myGoogleMap) && <UserNetwork />}

        {PageDialogHelper.render(PageDialog)}
        {PostDetailsDialogHelper.render(PageDialog)}
        {SavedPostsDialogHelper.render(PageDialog)}
        {IDoPostsDialogHelper.render(PageDialog)}

        {LoginDialogHelper.render(LoginDialog)}
        {MessageDialogHelper.render(MessageDialog)}
        {GuideDialogHelper.render(GuideDialog)}

        {EditPlaceDialogHelper.render()}
      </React.Suspense>
    );
    return (
      <ErrorBoundary>
        <SimplestLayout routes={routes} />
      </ErrorBoundary>
    );
  }
}

export default hot(App);
