import React from 'react';
import BasePage from '../_base/BasePage';
import './Home.scss';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Home';
  }

  componentDidMount() {
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
