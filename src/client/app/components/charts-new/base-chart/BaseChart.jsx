/* eslint-disable class-methods-use-this */
import React from 'react';
import BaseComponent from '../../_base/BaseComponent';
import './BaseChart.scss';


class BaseChart extends BaseComponent.Pure {
  get chart() {
    return this.chartRef.current && this.chartRef.current.chart;
  }

  get limit() {
    return this.props.limit;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  clean() {
    //
  }

  appendData() {
    //
  }

  renderChart() {
    return null;
  }

  renderBefore() {
    return null;
  }

  renderAfter() {
    return null;
  }

  renderCustomArea() {
    return null;
  }

  render() {
    return (
      <div className="custom-chart__wrapper">
        {this.renderBefore()}
        <div className="custom-chart pt-3 pr-2 shadow">
          {this.renderChart()}
          <div className="custom-chart__meta">
            {this.renderCustomArea()}
          </div>
        </div>
        {this.renderAfter()}
      </div>
    );
  }
}

export default BaseChart;
