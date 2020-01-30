import React from 'react';
import { Col, Row } from 'mdbreact';
import BaseComponent from '../../../../components/BaseComponent';
import Checkbox from '../../../../components/utils/checkbox/Checkbox';
import { ExperimentTargets } from '../../../../utils/Constants';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleTargetChange, this.dispatchTargetChangeEvent);
    const { targets } = this.InputValue;
    this.state = {
      targets
    };
  }

  handleTargetChange(event) {
    const { currentTarget: { id, checked } } = event;
    this.setState((prevState) => {
      const newTargets = [...prevState.targets];
      const selectedTarget = ExperimentTargets[id];
      if (checked) {
        newTargets.push(selectedTarget);
      } else {
        const index = newTargets.findIndex(target => target.id === selectedTarget.id);
        if (index >= 0) {
          newTargets.splice(index, 1);
        }
      }
      return {
        targets: newTargets
      };
    }, this.dispatchTargetChangeEvent);
  }

  dispatchTargetChangeEvent() {
    const { name: inputName = 'targets' } = this.props;
    this.buildAndDispatchEvent(this.Events.change, this.state.targets, inputName);
  }

  render() {
    const { name: inputName = 'targets' } = this.props;
    const { targets } = this.InputValue;

    return (
      <Row>
        {Object.values(ExperimentTargets).map(({ id, name, description }) => (
          <Col key={id}>
            <div className="text-center">
              <Checkbox
                id={id}
                name={inputName}
                checked={!!targets.find(target => target.id === id)}
                onChange={this.handleTargetChange}
              />
            </div>
            <label htmlFor={id} className="d-block cursor-pointer hover-light-red">
              <h5 className="text-center">{name}</h5>
              <div>{description}</div>
            </label>
          </Col>
        ))}
      </Row>
    );
  }
}
