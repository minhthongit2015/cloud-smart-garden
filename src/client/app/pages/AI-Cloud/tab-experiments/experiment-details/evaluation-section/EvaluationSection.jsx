/* eslint-disable class-methods-use-this */
import React from 'react';
import { Col, Row, MDBBtn } from 'mdbreact';
import BaseComponent from '../../../../../components/_base/BaseComponent';
// import ItemList from '../../../../../components/utils/item-list/ItemList';
import DatasetService from '../../../../../services/AI/DatasetService';
import ExperimentService from '../../../../../services/AI/ExperimentService';
import PredictionChart from '../../../../../components/charts/PredictionChart';
import LanguagesHelper, { tAI } from '../LanguagesHelper';


export default class extends BaseComponent.Pure {
  get predictionChart() {
    return this.predictionChartRef.current;
  }

  constructor(props) {
    super(props);
    this.predictionChartRef = React.createRef();
    this.bind(this.compare, this.handleCleanChart);
    LanguagesHelper.useAILanguage(this);
  }

  async compare() {
    const {
      experiment: { _id: experimentId },
      editingTarget
    } = this.props;
    if (!experimentId || !editingTarget || !this.predictionChart) {
      return;
    }

    this.predictionChart.clean();

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
      this.forceUpdate();
    });
  }

  handleCleanChart() {
    this.predictionChartRef.current.clean();
    this.forceUpdate();
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
    const { /* editingTarget, */ className } = this.props;
    const hasData = this.predictionChartRef.current && this.predictionChartRef.current.total > 0;

    return (
      <Row className={className || ''}>
        <Col size="12" className="text-center">
          <Row>
            <Col size="6" sm="4" className="offset-0 offset-sm-4">
              <MDBBtn
                className="px-3 py-2 mb-3"
                onClick={this.compare}
              ><i className={tAI('compareIcon')} /> {tAI('compare')}
              </MDBBtn>
            </Col>
            <Col size="6" sm="4" className="d-flex align-items-end justify-content-end">
              <MDBBtn
                className="px-2 py-1 hover-green grey-text text-normal"
                color="none"
                onClick={this.handleCleanChart}
                disabled={!hasData}
              >
                <i className="fas fa-broom" /> Clean Chart
              </MDBBtn>
            </Col>
          </Row>
          <div>
            <PredictionChart ref={this.predictionChartRef} />
          </div>
        </Col>

        {/* <Col size="3" className="arrow-right offset-3 mt-3">
          <div className="font-italic border-bottom mb-2">Tham số</div>
          <ItemList
            items={editingTarget.features.map(k => [k[0]])}
            itemContentProvider={this.renderParam}
          />
        </Col>
        <Col size="3" className="mt-3">
          <div className="font-italic border-bottom mb-2">Dự đoán</div>
          <ItemList
            items={editingTarget.labels.map(k => [k[0]])}
            itemContentProvider={this.renderPrediction}
          />
        </Col> */}
      </Row>
    );
  }
}
