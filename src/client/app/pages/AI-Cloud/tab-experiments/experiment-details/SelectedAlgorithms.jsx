import React from 'react';
import BaseComponent from '../../../../components/BaseComponent';


export default class extends BaseComponent.Pure {
  render() {
    const {
      algorithm, optimizers = [], losses = [], activations = []
    } = this.props;

    const algorithms = [];
    if (algorithm && optimizers && losses && activations) {
      optimizers.forEach((optimizer) => {
        losses.forEach((loss) => {
          activations.forEach((activation) => {
            algorithms.push({
              optimizer,
              loss,
              activation
            });
          });
        });
      });
    }

    return (
      <div>
        {algorithm && <div>Algorithm: {algorithm.label}</div>}
        <hr />
        <div>
          {algorithms.map(({ optimizer, loss, activation }) => (
            <div key={optimizer.value + loss.value + activation.value} className="m-2 border gradient-light-blue">
              <span className="d-inline-block p-2 m-2 border">{optimizer.label}</span>
              <span className="d-inline-block p-2 m-2 border">{loss.label}</span>
              <span className="d-inline-block p-2 m-2 border">{activation.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
