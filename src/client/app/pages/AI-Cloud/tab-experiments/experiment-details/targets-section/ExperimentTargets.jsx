import React from 'react';
import { Col, Row, MDBBtn } from 'mdbreact';
import classNames from 'classnames';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import { sameKey, findByKey } from '../../../../../utils';
import FixedRatioImage from '../../../../../components/utils/fixed-ratio-image/FixedRatioImage';
import './ExperimentTargets.scss';
import LanguagesHelper, { tAI } from '../LanguagesHelper';


const imgs = {
  nutrient: '/images/AI/target-nutrient.jpg',
  light: '/images/AI/target-light.jpg',
  temperature: '/images/AI/target-temperature.jpg',
  humidity: '/images/AI/target-humidity.jpg'
};


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleTargetFocus, this.handleTargetSetup);
    LanguagesHelper.useAILanguage(this);
  }

  handleTargetFocus(event) {
    const { targets } = this.props;
    const { currentTarget: { dataset: { id } } } = event;
    const target = findByKey(id, targets, '_id', '_id');
    this.buildAndDispatchEvent(this.Events.select, target, 'editingTarget', target);
  }

  handleTargetSetup(event) {
    const { targets } = this.props;
    const { currentTarget: { dataset: { id } } } = event;
    const target = findByKey(id, targets, '_id', '_id');
    this.buildAndDispatchEvent(this.Events.change, target, 'editingTarget', target);
  }

  render() {
    const { targets, editingTarget } = this.props;

    return (
      <Row className={`experiment-targets ${editingTarget ? 'focusing' : ''}`}>
        {Object.values(targets).map(({ _id, title, content }) => (
          <Col
            size="6"
            sm="6"
            md="6"
            lg="3"
            key={_id}
            className={classNames(
              'experiment-targets__target',
              'd-flex flex-column justify-content-between',
              { focus: sameKey(editingTarget, { _id }, '_id', '_id') }
            )}
          >
            <div>
              <h5 className="text-center text-green my-2">{tAI('targets', title) || title}</h5>
              <div className="cursor-pointer" data-id={_id} onClick={this.handleTargetFocus}>
                <FixedRatioImage src={imgs[title]} ratio={2 / 3} frame="rounded" />
              </div>
              <div className="p-3">{tAI('targetDesc', title) || content}</div>
            </div>
            <div className="text-center">
              <MDBBtn className="px-2 py-1" data-id={_id} onClick={this.handleTargetSetup}>
                <i className="fas fa-magic" /> <i className="fas fa-palette" /> Tùy chỉnh
              </MDBBtn>
            </div>
          </Col>
        ))}
      </Row>
    );
  }
}
