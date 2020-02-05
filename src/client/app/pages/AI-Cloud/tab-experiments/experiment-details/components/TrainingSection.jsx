/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import TrainOptionsSelect from './TrainOptionsSelect';
import TrainingVisualization from './TrainingVisualization';
import ExperimentService from '../../../../../services/AI/ExperimentService';
import Checkbox from '../../../../../components/utils/checkbox/Checkbox';
import DatasetService from '../../../../../services/AI/DatasetService';
import { layersAsArray } from '../../../../../utils';


class TrainingSection extends BaseComponent.Pure {
  get isAccuracy() {
    const { editingTarget: { labels } = {} } = this.props;
    return !labels || labels.length === 2;
  }

  get chart() {
    return this.trainingProgressChartRef.current;
  }

  constructor(props) {
    super(props);
    this.trainingProgressChartRef = React.createRef();
    this.bind(
      this.handleStartTraining, this.handleStopTraining,
      this.handleCleanChart, this.handleConnectChart, this.handleDisconnectChart,
      this.handleProgressChange
    );
    this.state = {
      isTraining: false,
      trainingCount: 0,
      batchSize: this.CachedValues.batchSize || 36,
      epochs: this.CachedValues.epochs || 40,
      continuous: this.getCachedValue('continuous', true),
      highResolution: this.getCachedValue('highResolution', true),
      enableChartLimit: this.getCachedValue('enableChartLimit', true),
      chartLimit: this.CachedValues.chartLimit || 100
    };
  }

  componentWillUnmount() {
    ExperimentService.stopTraining();
  }

  async handleStartTraining(event) {
    this.stopEvent(event);
    this.handleConnectChart();
    this.updateChartOptions();

    const {
      experiment: { _id: experimentId },
      editingTarget,
      datasets
    } = this.props;
    let datasetId;
    if (datasets[0]) {
      datasetId = datasets[0].value;
    } else {
      const res = await DatasetService.fetchDatasets();
      datasetId = res.data[0]._id;
    }

    const {
      algorithms: [{ key: algorithm }],
      optimizers: [{ key: optimizer }],
      losses: [{ key: loss }],
      activations: [{ key: activation }],
      layers
    } = editingTarget;

    const {
      batchSize,
      epochs,
      highResolution,
      continuous
    } = this.state;

    this.setState(prevState => ({
      isTraining: true,
      trainingCount: continuous ? prevState.trainingCount + 1 : 0
    }));

    ExperimentService.buildExperiment(
      experimentId,
      {
        targets: [editingTarget],
        algorithm,
        optimizer,
        loss,
        activation,
        layers: layersAsArray(layers),
        datasetId,
        batchSize,
        epochs,
        highResolution,
        continuous
      }
    );
  }

  handleStopTraining() {
    ExperimentService.stopTraining();
  }

  handleConnectChart() {
    ExperimentService.subscribeTrainingProgress((progress) => {
      this.handleProgressChange(progress);
    }, () => {
      this.updateChartOptions();
      this.setState({
        isTraining: true
      });
    }, () => {
      this.setState({
        isTraining: false
      });
    });
  }

  updateChartOptions() {
    this.chart.updateOptions(this.isAccuracy);
    this.chart.updateSeries([
      this.isAccuracy
        ? { name: 'Độ chính xác', data: [] }
        : { name: 'Độ sai lệch', data: [] }
    ]);
  }

  handleProgressChange(progress) {
    const { highResolution } = this.state;
    if ((highResolution && progress.epoch != null)
      || (!highResolution && progress.epoch == null)) {
      return;
    }
    this.chart.appendData(
      this.isAccuracy ? progress.acc : progress.loss
    );
    this.dispatchEvent(this.Events.progress, progress);
  }

  handleDisconnectChart() {
    ExperimentService.unsubscribeTrainingProgress();
  }

  handleCleanChart() {
    this.chart.updateSeries([
      { name: 'Độ chính xác', data: [] }
    ]);
  }

  render() {
    const {
      isTraining, trainingCount,
      batchSize, epochs, continuous,
      highResolution, enableChartLimit, chartLimit
    } = this.state;

    return (
      <React.Fragment>
        <div className="mt-3 text-center">
          <div className="d-inline-flex justify-content-center align-items-center ml-3">
            <TrainOptionsSelect
              batchSize={batchSize}
              epochs={epochs}
              continuous={continuous}
              onChange={this.handleInputChange}
            />
          </div>
          <MDBBtn onClick={this.handleStartTraining}>
            {(continuous && trainingCount > 0) ? 'Tiếp Tục Huấn Luyện' : 'Bắt Đầu Huấn Luyện'}
          </MDBBtn>
        </div>

        {/* <div className="text-center">
          {targets && Object.values(targets).map(target => (
            <Checkbox
              key={target.key}
              className="m-2"
              name={target.key}
              checked={this.InputValues[target.key]}
              onChange={this.handleInputChange}
            >
              {target.name}
            </Checkbox>
          ))}
        </div> */}

        <div className="mb-2 d-flex justify-content-between align-items-end">
          <div>
            <Checkbox
              className="mr-3"
              name="highResolution"
              checked={highResolution}
              onChange={this.handleInputChange}
              data-cached
            >High Resolution
            </Checkbox>
            <span>
              <Checkbox
                className="mr-1"
                name="enableChartLimit"
                checked={enableChartLimit}
                onChange={this.handleInputChange}
                data-cached
              >Limit:
              </Checkbox>
              <input
                style={{ width: '70px' }}
                className="px-1"
                name="chartLimit"
                type="number"
                value={chartLimit}
                onChange={this.handleInputChange}
                data-cached
              />
            </span>
          </div>
          <MDBBtn
            className="px-2 py-1 hover-light-red grey-text text-normal"
            color="none"
            onClick={this.handleStopTraining}
            disabled={!isTraining}
          >
            <i className="fas fa-pause-circle" /> Ngừng huấn luyện
          </MDBBtn>
        </div>
        <div className="mt-2 text-center">
          <TrainingVisualization
            chartRef={this.trainingProgressChartRef}
            onCleanChart={this.handleCleanChart}
            onDisconnectChart={this.handleDisconnectChart}
            onConnectChart={this.handleConnectChart}
            isAccuracy={this.isAccuracy}
            enableLimit={enableChartLimit}
            limit={chartLimit}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TrainingSection;
