import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Config from './config/site';
import Connection from './services/connection/websocket';

import Home from './pages/home/Home';
import AICloudPage from './pages/ai-cloud/AICloud';
import UserGardenPage from './pages/my-garden/MyGarden';
import UserNetWorkPage from './pages/smile-city/SmileCity';

import SimplestLayout from './layouts/simplest/simplest';

import RouteConstants from './utils/RouteConstants';

class App extends Component {
  constructor() {
    super();
    Connection.setup();
  }

  componentWillMount() {
    document.title = Config.WEBSITE_TITLE;
  }

  render() {
    const routes = (
      <React.Fragment>
        <Route path={RouteConstants.homePath} exact component={Home} />
        <Route path={RouteConstants.aiCloudPath} exact component={AICloudPage} />
        <Route path={RouteConstants.userGardensPath} exact component={UserGardenPage} />
        <Route path={RouteConstants.userNetworkPath} exact component={UserNetWorkPage} />
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <SimplestLayout routes={routes} />
      </React.Fragment>
    );
  }
}

export default App;
