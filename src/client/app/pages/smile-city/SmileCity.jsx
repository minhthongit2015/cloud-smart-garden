import React from 'react';
import BasePage from '../_base/BasePage';
import './SmileCity.scss';

import GGMap from '../../components/map/map';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'Smile City';
  }

  render() {
    return (
      <GGMap />
    );
  }
}
