import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './app.scss';

import Header from '../+layout/+header/header';
import Home from '../pages/home/home';

class App extends Component {
  componentWillMount() {
    document.title = '💝 IUH Student Partner';
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Route path="/" component={Home} />
      </React.Fragment>
    );
  }
}

export default App;
