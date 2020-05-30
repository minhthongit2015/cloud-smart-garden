/* eslint-disable max-len */
import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter
} from 'react-router-dom';
import GlobalState from './utils/GlobalState';
import LeafLoading from './components/utils/loadings/LeafLoading';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/scss/mdb.scss';

import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';

import ErrorBoundary from './components/utils/error-boundary/ErrorBoundary';
import SimplestLayout from './layouts/simplest/simplest';

import superws from './utils/superws';
import KeyTracker from './utils/KeyTracker';

import RouteConstants from './utils/RouteConstants';

import AuthService from './services/user/Auth';

import AnyDialogHelper from './helpers/dialogs/any-dialog/AnyDialogHelper';
import DialogsMap from './helpers/dialogs/any-dialog/DialogsMap';

import DummyUserNetwork from './pages/user-network/DummyUserNetwork';
import HistoryHelper from './helpers/HistoryHelper';
import AnyDialogChecker from './helpers/dialogs/any-dialog/AnyDialogChecker';

const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Intranet = React.lazy(() => import('./pages/intranet/Intranet'));
const PlantLibrary = React.lazy(() => import('./pages/plant-library/PlantLibrary'));
const MyGarden = React.lazy(() => import('./pages/my-garden/MyGarden'));
const GardenStreet = React.lazy(() => import('./pages/my-garden/_garden-street/GardenStreet'));
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
    // if (this.checkForUpdate()) {
    //   return;
    // }
    console.getImage(`${window.location.origin}/images/tomorrowland.jpg`, { height: 150 })
      .then((image) => {
        console.group('🚀 Alpha Team wiz 💓');
        console.h1('👩‍🔬 Welcome To The Tomorrowland! 🪐');
        console.logImage(image);
        console.groupEnd('🚀 Alpha Team wiz 💓');
      });

    HistoryHelper.init(props);
    KeyTracker();

    GlobalState.init();
    GlobalState.loadState();
    superws.init();
    AuthService.init();

    AnyDialogHelper.init(DialogsMap);
    AnyDialogChecker.init();
  }

  // eslint-disable-next-line class-methods-use-this
  checkForUpdate() {
    if (window.appLoaded === true) {
      window.appLoaded = 1;
      console.h1('Phiên Bản Mới Đã Được Cập Nhập. Tải lại sau 5 giây!');
      window.hasNewUpdate = true;
    }
    if (window.appLoaded) return true;
    window.appLoaded = true;
    return false;
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
          <Route path={RouteConstants.streetPath} render={props => <GardenStreet {...props} />} />
          <Route path={RouteConstants.myGardenPath} render={props => <MyGarden {...props} />} />
          <Route path={RouteConstants.plantLibraryPath} render={props => <PlantLibrary {...props} />} />
          <Route path={RouteConstants.aiCloudPath}><AICloud /></Route>
          <Route path={RouteConstants.nextFeaturesPath}><NextFeatures /></Route>
          <Route path={RouteConstants.userNetworkPath} component={DummyUserNetwork} />
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isUserNetwork || window.MyGoogleMap) && <UserNetwork />}
      </React.Suspense>
    );
    return (
      <ErrorBoundary>
        <SimplestLayout routes={routes} />
        {AnyDialogHelper.render()}
      </ErrorBoundary>
    );
  }
}

export default hot(withRouter(App));
