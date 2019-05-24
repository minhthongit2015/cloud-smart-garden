import React, { Component } from 'react';
import './styles.scss';
import CustomChart from '../../custom-chart/custom-chart';
// import { WS_EVENTS } from '../../../../shared/constants';

export default class extends Component {
  componentDidMount() {
    document.title = 'AI/ML Manager';
    this.dataEndPoint = '/apis/AI-ML/data/4'; // Get data from gardenId = 4
  }

  render() {
    return (
      <React.Fragment>
        <div className="md-form d-inline-flex">
          <select className="browser-default custom-select">
            <option defaultValue disabled>Optimizer</option>
            <option value="1">SGD</option>
            <option value="2">Adam</option>
          </select>
        </div>
        <div className="md-form d-inline-flex">
          <select className="browser-default custom-select">
            <option defaultValue disabled>Optimizer</option>
            <option value="1">SGD</option>
            <option value="2">Adam</option>
          </select>
        </div>
        <CustomChart dataEndPoint={this.dataEndPoint} />
      </React.Fragment>
    );
  }
}
