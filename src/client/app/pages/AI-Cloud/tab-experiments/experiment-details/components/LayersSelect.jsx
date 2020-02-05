import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import { layersAsArray, layersAsString } from '../../../../../utils';


export default class extends BaseComponent.Pure {
  render() {
    const { layers, layersName = 'layers' } = this.InputValues;

    const middleLayers = layersAsArray(layers);
    let totalMiddleNodes = 0;
    middleLayers.reduce((prevLayer, currentLayer) => {
      totalMiddleNodes += prevLayer * currentLayer;
      return currentLayer;
    }, 0);

    const label = totalMiddleNodes > 0
      ? `${middleLayers.length} Layer${middleLayers.length > 1 ? 's' : ''} (${totalMiddleNodes} nodes)`
      : 'Layers';

    return (
      <React.Fragment>
        <MDBInput
          id={layersName}
          name={layersName}
          label={label}
          value={layersAsString(layers)}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );
  }
}
