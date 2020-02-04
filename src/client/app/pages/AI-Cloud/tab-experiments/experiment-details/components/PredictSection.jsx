/* eslint-disable class-methods-use-this */
import React from 'react';
import { Col, Row, MDBInput } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import ItemList from '../../../../../components/utils/item-list/ItemList';


export default class extends BaseComponent.Pure {
  renderParam(item) {
    return (
      <input placeholder={item} />
    );
  }

  renderPrediction(item) {
    return (
      <div>
        {item}
      </div>
    );
  }

  render() {
    const { editingTarget, className } = this.props;
    return (
      <Row className={className || ''}>
        <Col size="3" className="arrow-right offset-3">
          <div className="font-italic border-bottom mb-2">Tham số</div>
          <ItemList
            items={editingTarget.features.map(k => [k[0]])}
            itemContentProvider={this.renderParam}
          />
        </Col>
        <Col size="3" className="">
          <div className="font-italic border-bottom mb-2">Dự đoán</div>
          <ItemList
            items={editingTarget.labels.map(k => [k[0]])}
            itemContentProvider={this.renderPrediction}
          />
        </Col>
      </Row>
    );
  }
}
