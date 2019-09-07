import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  Button, Row, Col
} from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';

import DatasetComponent from '../../../components/dataset/DatasetComponent';
import TrainingProgressChart from '../../../components/charts/TrainingProgressChart';
import AlgorithmConstants from './AlgorithmConstants';

import ExperimentService from '../../../services/ai/ExperimentService';


class TabExperiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      dataLimit: 144,
      algorithm: AlgorithmConstants.algorithm[0],
      optimizer: AlgorithmConstants.optimizer[0],
      loss: AlgorithmConstants.loss[0],
      activation: AlgorithmConstants.activation[0]
    };
    this.datasetChartRef = React.createRef();
    this.trainingProgressChartRef = React.createRef();

    this.onSaveDataset = this.onSaveDataset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBuildExperiment = this.handleBuildExperiment.bind(this);
  }

  componentDidMount() {
    this.subscribeDatasetChannel();
  }

  async subscribeDatasetChannel() {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const res = await ExperimentService.fetchDataset({ limit: this.state.dataLimit });
    if (!res.ok) {
      return;
    }
    this.datasetChartRef.current.setData(res.data);
    this.setState({
      dataset: res.data
    });
  }

  handleInputChange(event, options) {
    if (typeof event === 'string') {
      event = {
        target: {
          name: event,
          value: options
        }
      };
    }
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleBuildExperiment(event) {
    if (event) {
      event.preventDefault();
    }
    this.buildExperiment();
  }

  // eslint-disable-next-line class-methods-use-this
  buildExperiment() {
    ExperimentService.subscribeTrainingProgress((progress) => {
      console.log(progress);
      this.trainingProgressChartRef.current.chartRef.chart.appendData([
        {
          data: [progress.accuracy]
        }
      ]);
    });
    this.trainingProgressChartRef.current.chartRef.chart.updateSeries([
      { name: 'Accuracy', data: [] }
    ]);

    const {
      algorithm: { value: algorithm },
      optimizer: { value: optimizer },
      loss: { value: loss },
      activation: { value: activation },
      dataLimit
    } = this.state;
    ExperimentService.buildExperiment({
      algorithm,
      optimizer,
      loss,
      activation,
      limit: dataLimit
    });
  }

  onSaveDataset(dataset) {
    console.log(this.state.dataset);
    ExperimentService.updateDataset(dataset);
  }

  render() {
    const {
      algorithm, optimizer, loss, activation, dataLimit, dataset
    } = this.state;

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>Design Experiment</SectionHeader>
          <SectionBody>
            <Row>
              <Col size="6">
                <form onSubmit={this.handleBuildExperiment}>
                  <div className="mt-0">
                    <label htmlFor="algorithm">Algorithm</label>
                    <Select
                      id="algorithm"
                      name="algorithm"
                      onChange={option => this.handleInputChange('algorithm', option)}
                      options={AlgorithmConstants.algorithm}
                      value={algorithm}
                      components={makeAnimated()}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="optimizer">Optimizer</label>
                    <Select
                      id="optimizer"
                      name="optimizer"
                      onChange={option => this.handleInputChange('optimizer', option)}
                      options={AlgorithmConstants.optimizer}
                      value={optimizer}
                      isMulti
                      closeMenuOnSelect
                      components={makeAnimated()}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="loss">Loss</label>
                    <Select
                      id="loss"
                      name="loss"
                      onChange={option => this.handleInputChange('loss', option)}
                      options={AlgorithmConstants.loss}
                      value={loss}
                      isMulti
                      closeMenuOnSelect
                      components={makeAnimated()}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="activation">Activation</label>
                    <Select
                      id="activation"
                      name="activation"
                      onChange={option => this.handleInputChange('activation', option)}
                      options={AlgorithmConstants.activation}
                      value={activation}
                      isMulti
                      closeMenuOnSelect
                      components={makeAnimated()}
                    />
                  </div>

                  <div className="mt-3 text-right">
                    <Button type="submit">Test this Experiment</Button>
                  </div>
                </form>
              </Col>

              <Col size="6">
                <TrainingProgressChart
                  ref={this.trainingProgressChartRef}
                />
              </Col>
            </Row>
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader>Dữ liệu huấn luyện</SectionHeader>
          <SectionBody>
            <form>
              <Row>
                <Col>
                  <label htmlFor="data-limit">Kích thước</label>
                  <input
                    id="data-limit"
                    name="data-limit"
                    onChange={this.handleInputChange}
                    type="number"
                    min="0"
                    value={dataLimit}
                    placeholder="Kích thước"
                    className="form-control"
                  />
                </Col>
                <Col>
                  <label htmlFor="data-limit">Dữ liệu từ</label>
                  <input id="data-begin" type="date" placeholder="Điểm bắt đầu" className="form-control" />
                </Col>
                <Col>
                  <label htmlFor="data-zzz">zzz</label>
                  <input id="data-zzz" type="text" placeholder="" className="form-control" />
                </Col>
              </Row>
            </form>
            <DatasetComponent
              ref={this.datasetChartRef}
              dataset={dataset}
              onSave={this.onSaveDataset}
            />
          </SectionBody>
        </Section>

        <ul>
          <li>Lựa chọn + Quan sát dataset</li>
          <li>Phân tích dataset</li>
          <li>Chọn model, thuật toán...</li>
          <li>Thử nghiệm -&gt; So sánh kết quả</li>
          <li>Cho phép Ctrl + Z</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default TabExperiments;
