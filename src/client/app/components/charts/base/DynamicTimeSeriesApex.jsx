/* eslint-disable class-methods-use-this */
import React from 'react';
import TimeSeriesChart from './TimeSeriesChartApex';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import superrequest from '../../../utils/superrequest';
import BasePureComponent from '../../BasePureComponent';
import ApexchartsHelper from '../../../helpers/charts/ApexchartsHelper';


export default class DynamicTimeSeries extends BasePureComponent {
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
