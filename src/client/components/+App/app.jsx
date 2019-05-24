import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './app.scss';

import Header from '../+layout/header/header';
import SideBar from '../+layout/sidebar/sidebar';
import Home from '../pages/home/home';
import AIMLManager from '../pages/AI-ML-Manager/AIMLManager';
import Connection from '../../connection/connection';

class App extends Component {
  constructor() {
    super();
    Connection.setup();
  }
  
  componentWillMount() {
    document.title = '💝 IUH Student Partner';
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="body" className="d-flex">
          <SideBar />
          <div id="content">
            <Route path="/" exact component={Home} />
            <Route path="/AI-ML-Manager" exact component={AIMLManager} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
