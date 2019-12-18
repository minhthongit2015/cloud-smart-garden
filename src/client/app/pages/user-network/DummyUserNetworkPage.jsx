
import React from 'react';
import BasePage from '../_base/BasePage';
import t from '../../languages';

export default class extends BasePage {
  constructor(props) {
    super(props, t('pages.theRealWorld.title'));
    window.realWorldHistory = this.props.history;
  }

  render() {
    return <React.Fragment></React.Fragment>;
  }
}
