import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../components/BaseComponent';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.customHandleInputChange = this.customHandleInputChange.bind(this);
  }

  customHandleInputChange(event, ...args) {
    const { currentTarget: { name, value } } = event;
    localStorage[name] = value;
    this.handleInputChange(event, ...args);
  }

  render() {
    const {
      batchSize, epochs
    } = this.InputValue;
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
            onChange={this.customHandleInputChange}
            value={batchSize}
            type="number"
            min="0"
            step="1"
          />
        </div>
        <div className="mt-2">
          <MDBInput
            id={opochsName}
            name={opochsName}
            label="Epochs"
            onChange={this.customHandleInputChange}
            value={epochs}
            type="number"
            min="0"
            step="1"
          />
        </div>
      </React.Fragment>
    );
  }
}
