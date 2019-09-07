import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import SimplestLayout from './layouts/simplest/simplest';
import DummyUserNetWorkPage from './pages/smile-city/DummySmileCity';

import Config from './config/site';
import superws from './utils/superws';

import RouteConstants from './utils/RouteConstants';

import KeyTracker from './utils/KeyTracker';


const HomePage = React.lazy(() => import('./pages/home/Home'));
const AICloudPage = React.lazy(() => import('./pages/ai-cloud/AICloud'));
const UserGardenPage = React.lazy(() => import('./pages/my-garden/MyGarden'));
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
      <React.Fragment>
        <Switch>
          <Route exact path={RouteConstants.homePath}><HomePage /></Route>
          <Route path={RouteConstants.aiCloudPath}><AICloudPage /></Route>
          <Route exact path={RouteConstants.userGardensPath}><UserGardenPage /></Route>
          <Route exact path={RouteConstants.userNetworkPath}><DummyUserNetWorkPage /></Route>
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
