/* eslint-disable class-methods-use-this */
import React from 'react';
import TimeSeriesChart from './TimeSeriesChartApex';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import superrequest from '../../../utils/superrequest';
import ApexChartAdapter from '../../../helpers/charts/ApexChartAdapter';
import BaseComponent from '../../_base/BaseComponent';


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
    this.dispatchEvent(this.Events.fetch);
    superrequest.get(ApiEndpoints.limit(this.endPoint, 1000))
      .then((res) => {
        this.setState({
          chartProps: ApexChartAdapter.buildProps(res.data)
        }, () => {
          this.dispatchEvent(this.Events.fetched, res.data);
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
