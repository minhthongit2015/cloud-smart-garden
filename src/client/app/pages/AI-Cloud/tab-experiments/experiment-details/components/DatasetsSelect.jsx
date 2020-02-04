/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BaseComponent from '../../../../../components/BaseComponent';
import DatasetService from '../../../../../services/AI/DatasetService';
import { toOptions } from '../../../../../utils';


export default class DatasetSelect extends BaseComponent {
  constructor(props) {
    super(props);
    const { name = 'datasets' } = this.props;
    this.handleDatasetSelect = this.handleInputChange.bind(this, name);
    const { datasets } = this.InputValues;
    this.state = {
      datasets,
      datasetOptions: []
    };
  }

  componentDidMount() {
    DatasetService.fetchDatasets()
      .then((res) => {
        const datasets = toOptions(res.data, '_id', 'title');
        this.setState({
          datasetOptions: datasets,
          datasets: datasets.slice(0, 1)
        }, () => {
          this.handleDatasetSelect(this.state.datasets);
        });
      });
  }

  render() {
    const { name = 'datasets', className } = this.props;
    const { datasetOptions, datasets } = this.InputValues;
    return (
      <div className={className || ''}>
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

DatasetSelect.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  datasets: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func
};

DatasetSelect.defaultProps = {
  name: 'datasets',
  className: '',
  datasets: null,
  options: null,
  onChange: null
};
