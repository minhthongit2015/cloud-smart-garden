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
import ExperimentTargetsSelect from './ExperimentTargetsSelect';
import { ExperimentTargets } from '../../../../utils/Constants';
import TrainOptionsSelect from './TrainOptionsSelect';


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
      layers: localStorage.layers || '20,40',

      batchSize: localStorage.batchSize || 36,
      epochs: localStorage.epochs || 15,

      datasets: [],
      targets: [ExperimentTargets.nutrient]
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

  handleBuildExperiment(event) {
    this.stopEvent(event);
    this.buildExperiment();
  }

  buildExperiment() {
    this.props.getDialog().lock();
    ExperimentService.subscribeTrainingProgress((progress) => {
      this.trainingProgressChartRef.current.appendData([
        { data: [progress.accuracy] }
      ]);
    });
    this.trainingProgressChartRef.current.updateSeries([
      { name: 'Accuracy', data: [] }
    ]);

    const {
      experiment: { _id: experimentId },
      algorithm: { value: algorithm },
      optimizers: [{ value: optimizer }],
      losses: [{ value: loss }],
      activations: [{ value: activation }],
      datasets: [{ value: dataset }],
      batchSize,
      epochs,
      layers,
      targets
    } = this.state;
    ExperimentService.buildExperiment(
      experimentId,
      {
        algorithm,
        optimizer,
        loss,
        activation,
        batchSize,
        epochs,
        layers,
        dataset,
        targets: Object.values(targets)
      }
    );
  }

  render() {
    const {
      experiment,
      algorithm, optimizers, losses, activations, layers,
      batchSize, epochs,
      datasets, targets
    } = this.state || {};
    const selectedAlgorithms = {
      algorithm, optimizers, losses, activations, layers
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
                <Col className="">
                  <ExperimentTargetsSelect
                    targets={targets}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="6" className="mt-3">
                  <Row>
                    <Col>
                      <AlgorithmsSelect
                        {...selectedAlgorithms}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col>
                      <DatasetsSelect
                        datasets={datasets}
                        onChange={this.handleInputChange}
                      />
                      <TrainOptionsSelect
                        batchSize={batchSize}
                        epochs={epochs}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col size="6" className="mt-3">
                  <SelectedAlgorithms {...selectedAlgorithms} />
                </Col>
                <Col size="12" className="mt-3">
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
