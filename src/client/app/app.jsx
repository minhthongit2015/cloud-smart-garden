import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import SimplestLayout from './layouts/simplest/simplest';
// import HomePage from './pages/home/Home';
// import AICloudPage from './pages/ai-cloud/AICloud';
import UserGardenPage from './pages/my-garden/MyGarden';
// import UserNetWorkPage from './pages/smile-city/SmileCity';
import DummyUserNetWorkPage from './pages/smile-city/DummySmileCity';

import Config from './config/site';
import superws from './utils/superws';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';

const loading = <div className="d-flex w-100 h-100 justify-content-center align-items-center">loading...</div>;

const HomePage = React.lazy(() => import('./pages/home/Home'));
const AICloudPage = React.lazy(() => import('./pages/ai-cloud/AICloud'));
const UserNetWorkPage = React.lazy(() => import('./pages/smile-city/SmileCity'));

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isUserNetworkPage() {
    return window.location.pathname === RouteConstants.userNetworkPath;
  }

  constructor(props) {
    super(props);
    document.title = Config.WEBSITE_TITLE;
    superws.setup();
    KeyTracker();
  }

  render() {
    const routes = (
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path={RouteConstants.homePath} component={HomePage} />
          <Route path={RouteConstants.aiCloudPath} component={AICloudPage} />
          <Route exact path={RouteConstants.userGardensPath} component={UserGardenPage} />
          <Route exact path={RouteConstants.userNetworkPath} component={DummyUserNetWorkPage} />
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isUserNetworkPage || window.myGoogleMap) && <UserNetWorkPage />}
      </React.Suspense>
    );
    return (
      <SimplestLayout routes={routes} />
    );
  }
}

export default hot(App);
