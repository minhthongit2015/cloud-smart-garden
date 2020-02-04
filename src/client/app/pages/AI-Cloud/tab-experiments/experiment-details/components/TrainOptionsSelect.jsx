import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import Checkbox from '../../../../../components/utils/checkbox/Checkbox';


export default class extends BaseComponent.Pure {
  render() {
    const { batchSize, epochs, continuous } = this.InputValues;
    const {
      opochsName = 'epochs',
      batchSizeName = 'batchSize'
    } = this.props;

    return (
      <React.Fragment>
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
          style={{ maxWidth: '70px' }}
          className="m-2 d-inline-block"
        />
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
          style={{ maxWidth: '70px' }}
          className="m-2 d-inline-block"
        />
        <Checkbox
          className="mx-3"
          name="continuous"
          checked={continuous}
          onChange={this.handleInputChange}
          data-cached
        >Continuous Training
        </Checkbox>
      </React.Fragment>
    );
  }
}
