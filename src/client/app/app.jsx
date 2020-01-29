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
import KeyTracker from './utils/KeyTracker';

import RouteConstants from './utils/RouteConstants';

import AuthService from './services/user/Auth';

import AnyDialogHelper from './helpers/dialogs/any-dialog/AnyDialogHelper';
import DialogsMap from './helpers/dialogs/any-dialog/DialogsMap';

import EditPlaceDialogHelper from './helpers/dialogs/EditPlaceDialogHelper';
import ExpertDialog from './components/map-tools/edit-dialog/ExpertDialog';
import StrikeDialog from './components/map-tools/edit-dialog/StrikeDialog';
import ActionDialog from './components/map-tools/edit-dialog/ActionDialog';
import DisasterDialog from './components/map-tools/edit-dialog/DisasterDialog';
import ExtinctionDialog from './components/map-tools/edit-dialog/ExtinctionDialog';

import DummyUserNetwork from './pages/user-network/DummyUserNetwork';
import HistoryHelper from './helpers/HistoryHelper';
import AnyDialogChecker from './helpers/dialogs/any-dialog/AnyDialogChecker';

const HomePage = React.lazy(() => import('./pages/home/Home'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Intranet = React.lazy(() => import('./pages/intranet/Intranet'));
const MyGarden = React.lazy(() => import('./pages/my-garden/MyGarden'));
const AICloud = React.lazy(() => import('./pages/AI-Cloud/AICloud'));
const NextFeatures = React.lazy(() => import('./pages/next-features/NextFeatures'));
const UserNetwork = React.lazy(() => import('./pages/user-network/UserNetwork'));

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isUserNetwork() {
    return window.location.pathname.startsWith(RouteConstants.userNetworkPath);
  }

  constructor(props) {
    super(props);
    if (window.appLoaded === true) {
      window.appLoaded = 1;
      console.h1('Phiên Bản Mới Đã Được Cập Nhập. Tải lại sau 5 giây!');
      window.hasNewUpdate = true;
    }
    if (window.appLoaded) return;
    console.getImage(`${window.location.origin}/images/tomorrowland.jpg`, { height: 150 })
      .then((image) => {
        console.h1('Welcome To The Tomorrowland!');
        console.logImage(image);
      });
    window.appLoaded = true;

    HistoryHelper.init(props);
    KeyTracker();

    GlobalState.init();
    GlobalState.loadState();
    superws.init();
    AuthService.init();

    AnyDialogHelper.init(DialogsMap);
    AnyDialogChecker.init();
    EditPlaceDialogHelper.storeDialog([
      ExpertDialog, StrikeDialog, ActionDialog, DisasterDialog, ExtinctionDialog
    ]);
  }

  render() {
    if (window.hasNewUpdate) {
      return (
        <ErrorBoundary reload />
      );
    }

    const routes = (
      <React.Suspense fallback={<LeafLoading overlaping text="Beyond Garden" />}>
        <Switch>
          <Route exact path={RouteConstants.homePath}><HomePage /></Route>
          <Route path={RouteConstants.adminPath}><Dashboard /></Route>
          <Route path={RouteConstants.intranetPath}><Intranet /></Route>
          <Route path={RouteConstants.myGardenPath}><MyGarden /></Route>
          <Route path={RouteConstants.aiCloudPath}><AICloud /></Route>
          <Route path={RouteConstants.nextFeaturesPath}><NextFeatures /></Route>
          <Route path={RouteConstants.userNetworkPath} component={DummyUserNetwork} />
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isUserNetwork || window.myGoogleMap) && <UserNetwork />}
      </React.Suspense>
    );
    return (
      <ErrorBoundary>
        <SimplestLayout routes={routes} />

        {AnyDialogHelper.render()}
        {/* {SuperDialogHelper.render(SuperDialog)} */}

        {EditPlaceDialogHelper.render()}
      </ErrorBoundary>
    );
  }
}

export default hot(App);
