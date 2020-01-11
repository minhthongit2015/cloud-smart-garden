/* eslint-disable class-methods-use-this */
import React from 'react';
import TimeSeriesChart from './TimeSeriesChartApex';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import superrequest from '../../../utils/superrequest';
import ApexchartsHelper from '../../../helpers/charts/ApexchartsHelper';
import BaseComponent from '../../BaseComponent';


export default class DynamicTimeSeries extends BaseComponent.Pure {
  get endPoint() {
    return this.props.endPoint || ApiEndpoints.records;
  }

  constructor(props) {
    super(props);
    this.state = {
      chartProps: {}
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    superrequest.get(`${this.endPoint}?limit=100`)
      .then((res) => {
        this.setState({
          chartProps: ApexchartsHelper.buildProps(res.data)
        });
      });
  }

  render() {
    const { chartProps } = this.state;
    return (
      <TimeSeriesChart {...chartProps} />
    );
  }
}
