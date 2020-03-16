import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import Checkbox from '../../../../../components/utils/checkbox/Checkbox';
import LanguagesHelper, { tAI } from '../LanguagesHelper';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    LanguagesHelper.useAILanguage(this);
  }

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
          label={tAI('batchSize')}
          onChange={this.handleInputChange}
          value={batchSize}
          type="number"
          min="0"
          step="1"
          data-cached
          style={{ maxWidth: '150px' }}
          className="m-2 d-inline-block"
        />
        <MDBInput
          id={opochsName}
          name={opochsName}
          label={tAI('epochs')}
          onChange={this.handleInputChange}
          value={epochs}
          type="number"
          min="0"
          step="1"
          data-cached
          style={{ maxWidth: '100px' }}
          className="m-2 d-inline-block"
        />
        <Checkbox
          className="mx-3"
          name="continuous"
          checked={continuous}
          onChange={this.handleInputChange}
          data-cached
        >{tAI('continuous')}
        </Checkbox>
      </React.Fragment>
    );
  }
}
