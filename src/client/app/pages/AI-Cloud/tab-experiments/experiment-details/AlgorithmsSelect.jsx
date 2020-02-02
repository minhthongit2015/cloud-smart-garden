import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MDBInput } from 'mdbreact';
import BaseComponent from '../../../../components/BaseComponent';
import AlgorithmConstants from './AlgorithmConstants';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    const {
      algorithmName = 'algorithm',
      optimizerName = 'optimizers',
      lossName = 'losses',
      activationName = 'activations'
    } = this.props;
    this.handleAlgorithmSelect = this.handleInputChange.bind(this, algorithmName);
    this.handleOptimizerSelect = this.handleInputChange.bind(this, optimizerName);
    this.handleLossSelect = this.handleInputChange.bind(this, lossName);
    this.handleActivationSelect = this.handleInputChange.bind(this, activationName);
  }

  render() {
    const {
      algorithm, optimizers, losses, activations, layers
    } = this.InputValues;
    const {
      algorithmName = 'algorithm',
      optimizerName = 'optimizers',
      lossName = 'losses',
      activationName = 'activations',
      layersName = 'layers'
    } = this.props;

    const middleLayers = (layers || '')
      .replace(/[^0-9,]/g, '').split(',').map(layer => +layer).filter(layer => layer) || [];
    let totalMiddleNodes = 0;
    middleLayers.reduce((prevLayer, currentLayer) => {
      totalMiddleNodes += prevLayer * currentLayer;
      return currentLayer;
    }, 0);

    return (
      <React.Fragment>
        <div className="mt-0">
          <label htmlFor={algorithmName}>Algorithm</label>
          <Select
            id={algorithmName}
            name={algorithmName}
            onChange={this.handleAlgorithmSelect}
            options={AlgorithmConstants.algorithms}
            value={algorithm}
            components={makeAnimated()}
          />
        </div>

        <div className="mt-2">
          <label htmlFor={optimizerName}>Optimizer</label>
          <Select
            id={optimizerName}
            name={optimizerName}
            onChange={this.handleOptimizerSelect}
            options={AlgorithmConstants.optimizers}
            value={optimizers}
            isMulti
            closeMenuOnSelect
            components={makeAnimated()}
          />
        </div>

        <div className="mt-2">
          <label htmlFor={lossName}>Loss</label>
          <Select
            id={lossName}
            name={lossName}
            onChange={this.handleLossSelect}
            options={AlgorithmConstants.losses}
            value={losses}
            isMulti
            closeMenuOnSelect
            components={makeAnimated()}
          />
        </div>

        <div className="mt-2">
          <label htmlFor={activationName}>Activation</label>
          <Select
            id={activationName}
            name={activationName}
            onChange={this.handleActivationSelect}
            options={AlgorithmConstants.activations}
            value={activations}
            isMulti
            closeMenuOnSelect
            components={makeAnimated()}
          />
        </div>

        <div className="mt-2">
          <MDBInput
            id={layersName}
            name={layersName}
            label={`Layers (${totalMiddleNodes} nodes)`}
            value={layers}
            onChange={this.handleInputChange}
            data-cached
          />
        </div>
      </React.Fragment>
    );
  }
}
