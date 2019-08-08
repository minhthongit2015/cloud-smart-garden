import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import SimplestLayout from './layouts/simplest/simplest';
import Home from './pages/home/Home';
import AICloudPage from './pages/ai-cloud/AICloud';
import UserGardenPage from './pages/my-garden/MyGarden';
import UserNetWorkPage from './pages/smile-city/SmileCity';
import DummyUserNetWorkPage from './pages/smile-city/DummySmileCity';

import Config from './config/site';
import LiveService from './services/WebSocket';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  get isUserNetworkPage() {
    return window.location.pathname === RouteConstants.userNetworkPath;
  }

  constructor(props) {
    super(props);
    LiveService.setup();
    document.title = Config.WEBSITE_TITLE;
    KeyTracker();
  }

  render() {
    const routes = (
      <React.Fragment>
        <Switch>
          <Route exact path={RouteConstants.homePath} component={Home} />
          <Route exact path={RouteConstants.aiCloudPath} component={AICloudPage} />
          <Route exact path={RouteConstants.userGardensPath} component={UserGardenPage} />
          <Route exact path={RouteConstants.userNetworkPath} component={DummyUserNetWorkPage} />
          <Redirect to={RouteConstants.homeLink} />
        </Switch>
        {(this.isUserNetworkPage || window.myGoogleMap) && <UserNetWorkPage />}
      </React.Fragment>
    );
    return (
      <SimplestLayout routes={routes} />
    );
  }
}

export default hot(App);
