/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import DatasetService from '../../../../../services/AI/DatasetService';
import { toOptions, fromOptions } from '../../../../../utils';
import RouteConstants from '../../../../../utils/RouteConstants';


export default class DatasetSelect extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      datasetOptions: []
    };
  }

  componentDidMount() {
    DatasetService.list()
      .then((res) => {
        const datasets = toOptions(res.data, '_id', 'title');
        this.setState({
          datasetOptions: datasets
        }, () => {
          const { editingTarget } = this.props;
          editingTarget.datasets = editingTarget.datasets || fromOptions(datasets.slice(0, 1));
          this.dispatchEvent(this.Events.change, editingTarget);
        });
      });
  }

  handleSelectChange(value) {
    const { name = 'datasets', editingTarget } = this.props;
    editingTarget[name] = fromOptions(value);
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, editingTarget);
  }

  render() {
    const { name = 'datasets', className, editingTarget } = this.props;
    const { datasetOptions } = this.state;

    return (
      <div className={className || ''}>
        <Select
          id={name}
          name={name}
          onChange={this.handleSelectChange}
          options={datasetOptions}
          value={editingTarget && toOptions(editingTarget.datasets)}
          isMulti
          components={makeAnimated()}
        />
        <hr />
        <div className="text-center">
          <a
            className="hover-blue grey-text"
            href={RouteConstants.aiDatasetsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            tới trang datasets <i className="fas fa-external-link-square-alt" />
          </a>
        </div>
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
