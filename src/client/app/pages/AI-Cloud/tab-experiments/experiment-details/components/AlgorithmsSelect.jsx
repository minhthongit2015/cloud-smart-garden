import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Col, Row } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import LayersSelect from './LayersSelect';
import { toOptions, fromOptions } from '../../../../../utils';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    const {
      algorithmName = 'algorithm',
      optimizerName = 'optimizers',
      lossName = 'losses',
      activationName = 'activations'
    } = this.props;
    this.handleAlgorithmSelect = this.handleSelectChange.bind(this, algorithmName);
    this.handleOptimizerSelect = this.handleSelectChange.bind(this, optimizerName);
    this.handleLossSelect = this.handleSelectChange.bind(this, lossName);
    this.handleActivationSelect = this.handleSelectChange.bind(this, activationName);
  }

  handleSelectChange(name, value) {
    const { target } = this.props;
    target[name] = fromOptions(value);
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, target);
  }

  handleInputChange(event) {
    const { currentTarget: { name, value } } = event;
    const { target } = this.props;
    target[name] = value;
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, target);
  }

  render() {
    const { target } = this.props;
    const {
      // algorithm,
      optimizers, losses, activations, layers
    } = target || {};
    const {
      // algorithmName = 'algorithm',
      optimizerName = 'optimizers',
      lossName = 'losses',
      activationName = 'activations',
      layersName = 'layers'
    } = this.props;

    const targetType = (target && target.type) || {};
    // const algorithmOpts = toOptions(targetType.algorithms);
    const optimizerOpts = toOptions(targetType.optimizers);
    const lossOpts = toOptions(targetType.losses);
    const activationOpts = toOptions(targetType.activations);

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
              onChange={this.handleOptimizerSelect}
              options={optimizerOpts}
              value={toOptions(optimizers)}
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
              options={lossOpts}
              value={toOptions(losses)}
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
              options={activationOpts}
              value={toOptions(activations)}
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
