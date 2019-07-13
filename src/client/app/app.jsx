import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Config from './config/site';
import Connection from './services/connection/websocket';

import Home from './pages/home/Home';
import AIMLManagerPage from './pages/ai-cloud/AICloud';
import GardenManagerPage from './pages/my-garden/MyGarden';
import UserNetWorkPage from './pages/smile-city/SmileCity';

import SimplestLayout from './layouts/simplest/simplest';

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
        <Route path="/" exact component={Home} />
        <Route path="/AI-ML-Manager" exact component={AIMLManagerPage} />
        <Route path="/my-garden" exact component={GardenManagerPage} />
        <Route path="/user-network" exact component={UserNetWorkPage} />
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
