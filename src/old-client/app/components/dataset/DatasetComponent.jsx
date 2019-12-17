import React, { Component } from 'react';
import { Row, Col, Button } from 'mdbreact';
import EnvChart from './env/EnvApexChart';
import ActionChart from './action/ActionChart';
import Random from '../../utils/Random';

export default class DatasetComponent extends Component {
  constructor(props) {
    super(props);
    this.id = `dataset-chart__${props.id || Random.hex()}`;

    this.envChartRef = null;
    this.pumpRef = null;
    this.ledRef = null;
    this.save = this.save.bind(this);
    this.state = {
      dataset: props.dataset
    };
  }

  setData(dataset) {
    if (dataset) {
      if (this.envChartRef) {
        this.envChartRef.setData(dataset);
      }
      if (this.pumpRef) {
        this.pumpRef.setData(dataset);
      }
      if (this.ledRef) {
        this.ledRef.setData(dataset);
      }
      this.setState({
        dataset
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setSelectionToState(actionChartRef, state) {
    actionChartRef.setSelectionToState(state);
  }

  save() {
    if (this.props.onSave) {
      this.props.onSave(this.state.dataset);
    }
  }

  render() {
    const { dataset } = this.state;
    return (
      <React.Fragment>
        <EnvChart
          id="Temperature"
          group={this.id}
          ref={(ref) => { this.envChartRef = ref; }}
          columns={['temperature', 'humidity']}
          dataset={dataset}
        />
        <ActionChart
          id="Pump"
          group={this.id}
          ref={(ref) => { this.pumpRef = ref; }}
          columns={['pump']}
          dataset={dataset}
        >
          <Row>
            <Col>Pump</Col>
            <Col className="text-right">
              <Button size="sm" onClick={() => this.setSelectionToState(this.pumpRef, true)}>On</Button>
              <Button size="sm" onClick={() => this.setSelectionToState(this.pumpRef, false)}>Off</Button>
              <Button size="sm" onClick={this.save}>Save</Button>
            </Col>
          </Row>
        </ActionChart>
        <ActionChart
          id="Led"
          group={this.id}
          ref={(ref) => { this.ledRef = ref; }}
          columns={['led']}
          dataset={dataset}
        >
          <Row>
            <Col>Led</Col>
            <Col className="text-right">
              <Button size="sm" onClick={() => this.setSelectionToState(this.ledRef, true)}>On</Button>
              <Button size="sm" onClick={() => this.setSelectionToState(this.ledRef, false)}>Off</Button>
              <Button size="sm" onClick={this.save}>Save</Button>
            </Col>
          </Row>
        </ActionChart>
      </React.Fragment>
    );
  }
}
