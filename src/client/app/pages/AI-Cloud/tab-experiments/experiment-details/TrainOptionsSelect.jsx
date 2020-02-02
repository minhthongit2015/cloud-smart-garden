import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../components/BaseComponent';


export default class extends BaseComponent.Pure {
  render() {
    const {
      batchSize, epochs
    } = this.InputValues;
    const {
      opochsName = 'epochs',
      batchSizeName = 'batchSize'
    } = this.props;

    return (
      <React.Fragment>
        <div className="mt-2">
          <MDBInput
            id={batchSizeName}
            name={batchSizeName}
            label="Batch Size"
            onChange={this.handleInputChange}
            value={batchSize}
            type="number"
            min="0"
            step="1"
            data-cached
          />
        </div>
        <div className="mt-2">
          <MDBInput
            id={opochsName}
            name={opochsName}
            label="Epochs"
            onChange={this.handleInputChange}
            value={epochs}
            type="number"
            min="0"
            step="1"
            data-cached
          />
        </div>
      </React.Fragment>
    );
  }
}
