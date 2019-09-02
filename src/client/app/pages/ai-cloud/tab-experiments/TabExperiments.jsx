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

class TabExperiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      dataLimit: 1000
    };
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

  render() {
    const { options } = this.props;
    const baseOptions = {

    };
    const { dataset, dataLimit } = this.state;

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>Design your Experiment</SectionHeader>
          <SectionBody>
            <Row>
              <Col size="6">
                <form>
                  <div className="mt-0">
                    <label htmlFor="algorithm">Algorithm</label>
                    <Select
                      id="algorithm"
                      components={makeAnimated()}
                      options={[
                        { value: 'neural-network', label: 'Neural Network' },
                        { value: 'linear-regression', label: 'Linear Regression' },
                        { value: 'polynomial-regression', label: 'Polynomial Regression' }
                      ]}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="optimizer">Optimizer</label>
                    <Select
                      id="optimizer"
                      components={makeAnimated()}
                      options={[
                        { value: 'adam', label: 'Adam' },
                        { value: 'sgd', label: 'SGD' }
                      ]}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="loss">Loss</label>
                    <Select
                      id="loss"
                      components={makeAnimated()}
                      options={[
                        { value: 'sparseCategoricalCrossentropy', label: 'Sparse Categorical Crossentropy' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' }
                      ]}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="activation">Activation</label>
                    <Select
                      id="activation"
                      components={makeAnimated()}
                      options={[
                        { value: 'relu', label: 'Relu' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' }
                      ]}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>

                  <div className="mt-3 text-right">
                    <Button>Test this Experiment</Button>
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
                  <input type="number" min="0" value={dataLimit} placeholder="Kích thước" className="form-control" />
                </Col>
                <Col>
                  <input type="date" placeholder="Điểm bắt đầu" className="form-control" />
                </Col>
                <Col>
                  <input type="text" placeholder="" className="form-control" />
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
