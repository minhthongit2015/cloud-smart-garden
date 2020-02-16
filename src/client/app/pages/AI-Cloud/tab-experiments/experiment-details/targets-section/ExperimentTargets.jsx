import React from 'react';
import { Col, Row, MDBBtn } from 'mdbreact';
import classNames from 'classnames';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import { sameKey } from '../../../../../utils';
import FixedRatioImage from '../../../../../components/utils/fixed-ratio-image/FixedRatioImage';
import './ExperimentTargets.scss';


const imgs = {
  nutrient: 'https://www.gold-mann.de/en/wp-content/uploads/sites/2/2016/10/fertiliser_71360629_556x369_060.jpg',
  light: 'https://static.manitobacooperator.ca/wp-content/uploads/2017/12/young-plant_ThinkstockPhoto.jpg',
  temperature: 'https://cf.ltkcdn.net/garden/images/std/254882-1600x1067-watering.jpg',
  humidity: 'https://ak2.picdn.net/shutterstock/videos/1020448882/thumb/10.jpg?ip=x480'
};


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleTargetFocus, this.handleTargetSetup);
  }

  handleTargetFocus(event) {
    const { targets } = this.props;
    const { currentTarget: { dataset: { key } } } = event;
    const target = targets[key];
    this.buildAndDispatchEvent(this.Events.select, target, 'editingTarget', target);
  }

  handleTargetSetup(event) {
    const { targets } = this.props;
    const { currentTarget: { dataset: { key } } } = event;
    const target = targets[key];
    this.buildAndDispatchEvent(this.Events.change, target, 'editingTarget', target);
  }

  render() {
    const { targets, editingTarget } = this.props;

    return (
      <Row className={`experiment-targets ${editingTarget ? 'focusing' : ''}`}>
        {Object.values(targets).map(({ key, name, description }) => (
          <Col
            size="6"
            sm="6"
            md="6"
            lg="3"
            key={key}
            className={classNames(
              'experiment-targets__target',
              'd-flex flex-column justify-content-between',
              { focus: sameKey(editingTarget, { key }) }
            )}
          >
            <div>
              <h5 className="text-center text-green my-2">{name}</h5>
              <div className="cursor-pointer" data-key={key} onClick={this.handleTargetFocus}>
                <FixedRatioImage src={imgs[key]} ratio={2 / 3} frame="rounded" />
              </div>
              <div className="p-3">{description}</div>
            </div>
            <div className="text-center">
              <MDBBtn className="px-2 py-1" data-key={key} onClick={this.handleTargetSetup}>
                <i className="fas fa-magic" /> <i className="fas fa-palette" /> Tùy chỉnh
              </MDBBtn>
            </div>
          </Col>
        ))}
      </Row>
    );
  }
}
