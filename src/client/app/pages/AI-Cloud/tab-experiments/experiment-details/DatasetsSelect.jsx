import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BaseComponent from '../../../../components/BaseComponent';
import DatasetService from '../../../../services/AI/DatasetService';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    const { name = 'datasets' } = this.props;
    this.handleDatasetSelect = this.handleInputChange.bind(this, name);
    const { datasets } = this.InputValue;
    this.state = {
      datasets,
      datasetOptions: []
    };
  }

  componentDidMount() {
    DatasetService.fetchDatasets()
      .then((res) => {
        const datasets = this.resolveDatasets(res.data);
        this.setState({
          datasetOptions: datasets,
          datasets: datasets.slice(0, 1)
        }, () => {
          this.handleDatasetSelect(this.state.datasets);
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  resolveDatasets(datasets) {
    datasets.forEach((dataset) => {
      dataset.value = dataset._id;
      dataset.label = dataset.title;
    });
    return datasets;
  }

  render() {
    const { name = 'datasets' } = this.props;
    const { datasetOptions, datasets } = this.InputValue;
    return (
      <div className="mt-2">
        <label htmlFor={name}>Dataset</label>
        <Select
          id={name}
          name={name}
          onChange={this.handleDatasetSelect}
          options={datasetOptions}
          value={datasets}
          isMulti
          components={makeAnimated()}
        />
      </div>
    );
  }
}
