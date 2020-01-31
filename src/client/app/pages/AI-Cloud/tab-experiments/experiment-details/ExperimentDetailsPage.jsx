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
import Checkbox from '../../../../components/utils/checkbox/Checkbox';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.trainingProgressChartRef = React.createRef();
    this.handleBuildExperiment = this.handleBuildExperiment.bind(this);
    this.handleStopTraining = this.handleStopTraining.bind(this);
    this.handleCleanChart = this.handleCleanChart.bind(this);

    this.state = {
      experiment: props.data,
      algorithm: AlgorithmConstants.algorithms[0],
      optimizers: AlgorithmConstants.optimizers.slice(0, 1),
      losses: AlgorithmConstants.losses.slice(0, 1),
      activations: AlgorithmConstants.activations.slice(0, 1),
      layers: this.CachedValues.layers || '5,10,15,5',

      batchSize: this.CachedValues.batchSize || 36,
      epochs: this.CachedValues.epochs || 40,

      highResolution: this.CachedValues.defaultTrue.highResolution,
      saveModel: this.CachedValues.defaultTrue.saveModel,

      datasets: [],
      targets: [ExperimentTargets.light]
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
    }, () => {
      this.trainingProgressChartRef.current.updateSeries([
        { name: 'Accuracy', data: [] }
      ]);
    });

    const {
      experiment: { _id: experimentId },
      targets,
      algorithm: { value: algorithm },
      optimizers: [{ value: optimizer }],
      losses: [{ value: loss }],
      activations: [{ value: activation }],
      layers,
      datasets: [{ value: datasetId }],
      batchSize,
      epochs,
      highResolution,
      saveModel
    } = this.state;

    const mappedLayers = (layers || '').replace(/[^0-9,]/g, '')
      .split(',').map(layer => +layer).filter(layer => layer);

    ExperimentService.buildExperiment(
      experimentId,
      {
        targets: Object.values(targets),
        algorithm,
        optimizer,
        loss,
        activation,
        layers: mappedLayers,
        datasetId,
        batchSize,
        epochs,
        highResolution,
        saveModel
      }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  handleStopTraining() {
    ExperimentService.stopTraining();
  }

  handleCleanChart() {
    this.trainingProgressChartRef.current.updateSeries([
      { name: 'Độ chính xác', data: [] }
    ]);
  }

  render() {
    const {
      experiment,
      algorithm, optimizers, losses, activations, layers,
      batchSize, epochs, highResolution, saveModel,
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
                  <div className="mt-3 text-center">
                    <Checkbox
                      className="mx-3"
                      name="highResolution"
                      checked={highResolution}
                      onChange={this.handleInputChange}
                      data-cached
                    >High Resolution
                    </Checkbox>
                    <Checkbox
                      className="mx-3"
                      name="saveModel"
                      checked={saveModel}
                      onChange={this.handleInputChange}
                      data-cached
                    >Save Model
                    </Checkbox>
                  </div>
                  <div className="mt-3 text-center">
                    <Button color="none" className="my-2 mx-3" onClick={this.handleStopTraining}>
                      <i className="fas fa-ban" /> Stop Training
                    </Button>
                    <Button color="none" className="my-2 mx-3" onClick={this.handleCleanChart}>
                      <i className="fas fa-broom" /> Clean Chart
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </SectionBody>
        </Section>
      </React.Fragment>
    );
  }
}
