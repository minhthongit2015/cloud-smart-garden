/* eslint-disable class-methods-use-this */
import React from 'react';
import { Col, Row, MDBBtn } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import ItemList from '../../../../../components/utils/item-list/ItemList';
import DatasetService from '../../../../../services/AI/DatasetService';
import ExperimentService from '../../../../../services/AI/ExperimentService';
import PredictionChart from '../../../../../components/charts/PredictionChart';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.predictionChartRef = React.createRef();
    this.bind(this.compare);
  }

  async compare() {
    const {
      experiment: { _id: experimentId },
      editingTarget
    } = this.props;

    const {
      datasets
    } = editingTarget;

    let datasetId;
    if (datasets && datasets[0]) {
      datasetId = datasets[0].key;
    } else {
      const res = await DatasetService.fetchDatasets();
      datasetId = res.data[0]._id;
    }

    ExperimentService.compare(
      experimentId,
      {
        targets: [editingTarget],
        datasetId
      }
    ).then((res) => {
      this.predictionChartRef.current.setData(res.data[0]);
    });
  }

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
        <Col size="12" className="text-center">
          <MDBBtn
            className="px-3 py-2"
            onClick={this.compare}
          >So sánh
          </MDBBtn>
          <div>
            <PredictionChart ref={this.predictionChartRef} />
          </div>
        </Col>
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
