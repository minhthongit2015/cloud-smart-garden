import React, { Component } from 'react';
import './styles.scss';

export default class extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <React.Fragment>
        <div>Something about project</div>
      </React.Fragment>
    );
  }
}
