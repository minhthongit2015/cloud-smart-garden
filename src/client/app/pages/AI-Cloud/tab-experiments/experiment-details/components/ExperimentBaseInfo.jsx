import React from 'react';
import BaseComponent from '../../../../../components/BaseComponent';


export default class extends BaseComponent.Pure {
  render() {
    const { experiment } = this.props;
    return (
      <div>
        Experiment: {experiment && experiment.title}
      </div>
    );
  }
}
