import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Col, Row } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import LayersSelect from './LayersSelect';
import { toOptions, fromOptions } from '../../../../../utils';


export default class extends BaseComponent {
  handleSelectChange(value, { name }) {
    const { editingTarget } = this.props;
    editingTarget[name] = fromOptions(value);
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

    const targetType = (editingTarget && editingTarget.type) || {};
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
              onChange={this.handleSelectChange}
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
              onChange={this.handleSelectChange}
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
              onChange={this.handleSelectChange}
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
