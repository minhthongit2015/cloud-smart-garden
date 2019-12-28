import React from 'react';
import BasePureComponent from '../../../BasePureComponent';


export default class extends BasePureComponent {
  render() {
    const { experiment } = this.props;
    return (
      <div>
        Experiment: {experiment && experiment.title}
      </div>
    );
  }
}
