import React, { Component } from 'react';
import * as moment from 'moment';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  Button, Row, Col
} from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DatasetChart from '../../../components/charts/DatasetChart';
import LiveConnect from '../../../services/WebSocket';
import { apiEndpoints } from '../../../utils/Constants';
import AlgorithmConstants from './AlgorithmConstants';

class TabExperiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      dataLimit: 1000,
      algorithm: AlgorithmConstants.algorithm[0],
      optimizer: AlgorithmConstants.optimizer[0],
      loss: AlgorithmConstants.loss[0],
      activation: AlgorithmConstants.activation[0]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBuildExperiment = this.handleBuildExperiment.bind(this);
  }

  componentDidMount() {
    this.subscribeDatasetDataChannel();
  }

  subscribeDatasetDataChannel() {
    LiveConnect.get(`${apiEndpoints.ai.datasetItem(1)}?limit=100`).then((res) => {
      this.setState({
        dataset: TabExperiments.mapDatasetToChartData(res.data)
      });
    });
  }

  static mapDatasetToChartData(dataset) {
    function calcCellVal(val) {
      if (val === true) return 100;
      if (val === false) return 50;
      return val;
    }
    const { /* meta, */ columns, rows, labels } = dataset;
    const lines = columns.map(column => ({
      id: column,
      data: []
    }));
    rows.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        lines[columnIndex].data.push({
          y: calcCellVal(cellValue),
          x: moment(labels[rowIndex]).format('HH:mm')
        });
      });
    });
    const allowedLines = ['temperature', 'humidity', 'light'];
    return lines.filter(line => allowedLines.includes(line.id));
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

  buildExperiment() {

  }

  render() {
    const { options } = this.props;
    const baseOptions = {

    };
    const {
      algorithm, optimizer, loss, activation, dataset, dataLimit
    } = this.state;

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>Thiết kế Kinh Nghiệm</SectionHeader>
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

              <Col size="6" />
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
            <DatasetChart
              options={{
                ...options,
                ...baseOptions
              }}
              data={dataset || []}
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
