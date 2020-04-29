import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Col, Row } from 'mdbreact';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import LayersSelect from './LayersSelect';
import { toOptions, findByKey } from '../../../../../utils';
import { ExperimentTargetTypes } from '../../../../../utils/Constants';


export default class extends BaseComponent {
  handleSelectChange(value, { name }) {
    const { editingTarget } = this.props;
    editingTarget[name] = value.map(val => val.value);
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, editingTarget);
  }

  handleInputChange(event) {
    const { currentTarget: { name, value } } = event;
    const { editingTarget } = this.props;
    editingTarget[name] = value;
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, editingTarget);
  }

  render() {
    const { editingTarget } = this.props;
    const {
      // algorithm,
      optimizers, losses, activations, layers
    } = editingTarget || {};
    const {
      // algorithmName = 'algorithm',
      optimizerName = 'optimizers',
      lossName = 'losses',
      activationName = 'activations',
      layersName = 'layers'
    } = this.props;

    const targetTypeName = (editingTarget && editingTarget.type);
    const targetType = targetTypeName && ExperimentTargetTypes[targetTypeName];
    const optimizerOpts = toOptions(targetType && targetType.optimizers);
    const lossOpts = toOptions(targetType && targetType.losses);
    const activationOpts = toOptions(targetType && targetType.activations);

    const selectedOptimizers = optimizers && optimizers.map(
      optimizer => findByKey(optimizer, optimizerOpts, null, 'value')
    );
    const selectedLosses = losses && losses.map(
      loss => findByKey(loss, lossOpts, null, 'value')
    );
    const selectedActivations = activations && activations.map(
      activation => findByKey(activation, activationOpts, null, 'value')
    );

    return (
      <Row>
        <Col>
          {/* <div className="mt-0">
            <label htmlFor={algorithmName}>Algorithm</label>
            <Select
              id={algorithmName}
              name={algorithmName}
              onChange={this.handleAlgorithmSelect}
              options={algorithmOpts}
              value={algorithm}
              components={makeAnimated()}
            />
          </div> */}

          <div className="mt-0">
            <label htmlFor={optimizerName}>Optimizer</label>
            <Select
              id={optimizerName}
              name={optimizerName}
              onChange={this.handleSelectChange}
              options={optimizerOpts}
              value={selectedOptimizers}
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
              onChange={this.handleSelectChange}
              options={lossOpts}
              value={selectedLosses}
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
              onChange={this.handleSelectChange}
              options={activationOpts}
              value={selectedActivations}
              isMulti
              closeMenuOnSelect
              components={makeAnimated()}
            />
          </div>
        </Col>
        <Col>
          <LayersSelect
            layers={layers}
            layersName={layersName}
            onChange={this.handleInputChange}
          />
        </Col>
      </Row>
    );
  }
}
