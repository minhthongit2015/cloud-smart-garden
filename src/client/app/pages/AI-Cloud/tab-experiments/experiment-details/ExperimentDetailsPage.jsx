import React from 'react';
import { Row, Col, Button } from 'mdbreact';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import superrequest from '../../../../utils/superrequest';
import ApiEndpoints from '../../../../utils/ApiEndpoints';
import { Section, SectionHeader, SectionBody } from '../../../../layouts/base/section';
import AlgorithmConstants from './AlgorithmConstants';
import ExperimentService from '../../../../services/AI/ExperimentService';
import TrainingProgressChart from '../../../../components/charts/TrainingProgressChart';
import ExperimentBaseInfo from './ExperimentBaseInfo';
import BaseComponent from '../../../../components/BaseComponent';
import AlgorithmsSelect from './AlgorithmsSelect';
import DatasetsSelect from './DatasetsSelect';
import SelectedAlgorithms from './SelectedAlgorithms';
import ExperimentTargets from './ExperimentTargets';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    // this.datasetChartRef = React.createRef();
    this.trainingProgressChartRef = React.createRef();
    this.handleBuildExperiment = this.handleBuildExperiment.bind(this);

    this.state = {
      experiment: props.data,
      algorithm: AlgorithmConstants.algorithms[0],
      optimizers: AlgorithmConstants.optimizers.slice(0, 1),
      losses: AlgorithmConstants.losses.slice(0, 1),
      activations: AlgorithmConstants.activations.slice(0, 1),
      datasets: [],
      targets: {}
    };
  }

  componentDidMount() {
    // this.fetchExperiment();
    // this.subscribeDatasetChannel();
  }

  fetchExperiment() {
    const { match: { params: { experimentId } = {} } = {} } = this.props;
    superrequest.agentGet(ApiEndpoints.postOrder(experimentId))
      .then((res) => {
        this.setState({
          experiment: res.data[0]
        });
      });
  }

  async subscribeDatasetChannel() {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const res = await ExperimentService.fetchDataset({ limit: this.state.dataLimit });
    if (!res.ok) {
      return;
    }
    // this.datasetChartRef.current.setData(res.data);
    this.setState({
      dataset: res.data
    });
  }

  handleBuildExperiment(event) {
    this.stopEvent(event);
    this.buildExperiment();
  }

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

  render() {
    const {
      experiment,
      algorithm, optimizers, losses, activations,
      datasets, targets
    } = this.state || {};
    const selectedAlgorithms = {
      algorithm, optimizers, losses, activations
    };

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>Thông tin chế độ chăm sóc</SectionHeader>
          <SectionBody>
            <ExperimentBaseInfo experiment={experiment} />
          </SectionBody>
        </Section>
        <Section>
          <SectionHeader>Design Experiment</SectionHeader>
          <SectionBody>
            <form onSubmit={this.handleBuildExperiment}>
              <Row>
                <Col size="6">
                  <AlgorithmsSelect
                    {...selectedAlgorithms}
                    onChange={this.handleInputChange}
                  />
                  <DatasetsSelect
                    datasets={datasets}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col size="6">
                  <SelectedAlgorithms {...selectedAlgorithms} />
                </Col>
                <Col className="my-3">
                  <ExperimentTargets
                    targets={targets}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col size="12">
                  <div className="mt-3 text-center">
                    <Button type="submit">Test this Experiment</Button>
                  </div>
                  <TrainingProgressChart
                    ref={this.trainingProgressChartRef}
                  />
                </Col>
              </Row>
            </form>
          </SectionBody>
        </Section>
      </React.Fragment>
    );
  }
}
