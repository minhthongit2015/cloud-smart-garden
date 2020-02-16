import React from 'react';
import { Button } from 'mdbreact';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import TrainingProgressChart from '../../../../../components/charts/TrainingProgressChart';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind(
      this.handleCleanChart, this.handleDisconnectChart, this.handleConnectChart
    );
  }

  handleCleanChart() {
    this.dispatchEvent({ typez: 'cleanChart' });
  }

  handleDisconnectChart() {
    this.dispatchEvent({ typez: 'disconnectChart' });
  }

  handleConnectChart() {
    this.dispatchEvent({ typez: 'connectChart' });
  }

  render() {
    const {
      className, chartRef, isAccuracy, enableLimit, limit
    } = this.props;

    return (
      <div className={`text-center ${className || ''}`}>
        <div>
          <TrainingProgressChart
            ref={chartRef}
            isAccuracy={isAccuracy}
            enableLimit={enableLimit}
            limit={limit}
          />
        </div>
        <div className="text-center">
          <Button color="none" className="my-2 mx-3 py-1 px-2 hover-light-red" onClick={this.handleDisconnectChart}>
            <i className="fas fa-phone-slash" /> Disconnect Chart
          </Button>
          <Button color="none" className="my-2 mx-3 py-1 px-2 hover-blue" onClick={this.handleConnectChart}>
            <i className="fas fa-plug" /> Connect Chart
          </Button>
          <Button color="none" className="my-2 mx-3 py-1 px-2 hover-green" onClick={this.handleCleanChart}>
            <i className="fas fa-broom" /> Clean Chart
          </Button>
        </div>
      </div>
    );
  }
}
