import React from 'react';
import { Col, Row } from 'mdbreact';
import BaseComponent from '../../../../components/BaseComponent';
import Checkbox from '../../../../components/utils/checkbox/Checkbox';


const Targets = {
  nutrient: {
    name: 'Tối ưu Dinh dưỡng',
    description: 'Tự động điều chỉnh dinh dưỡng.'
  },
  light: {
    name: 'Tối ưu Ánh sáng',
    description: 'Tự động bổ sung ánh sáng nhân tạo nếu cần thiết.'
  },
  temperature: {
    name: 'Tối ưu Nhiệt độ',
    description: 'Tự động phun sương hoặc bật quạt làm mát nếu nhiệt độ tăng cao.'
  },
  humidity: {
    name: 'Tối ưu Độ ẩm',
    description: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm trong vườn.'
  }
};

export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleTargetChange, this.dispatchTargetChangeEvent);
    this.state = {
      targets: {}
    };
  }

  handleTargetChange(event) {
    const { currentTarget: { id, checked } } = event;
    this.setState((prevState) => {
      const newTargets = { ...prevState.targets };
      if (checked) {
        newTargets[id] = Targets[id];
      } else {
        delete newTargets[id];
      }
      return {
        targets: newTargets
      };
    }, this.dispatchTargetChangeEvent);
  }

  dispatchTargetChangeEvent() {
    this.buildAndDispatchEvent(this.Events.change, this.state.targets, 'targets');
  }

  render() {
    const { name: inputName = 'targets' } = this.props;
    const { targets } = this.InputValue;

    return (
      <Row>
        {Object.entries(Targets).map(([key, { name, description }]) => (
          <Col key={key}>
            <div className="text-center">
              <Checkbox
                id={key}
                name={inputName}
                checked={!!targets[key]}
                onChange={this.handleTargetChange}
              />
            </div>
            <label htmlFor={key} className="d-block cursor-pointer hover-light-red">
              <h5 className="text-center">{name}</h5>
              <div>{description}</div>
            </label>
          </Col>
        ))}
      </Row>
    );
  }
}
