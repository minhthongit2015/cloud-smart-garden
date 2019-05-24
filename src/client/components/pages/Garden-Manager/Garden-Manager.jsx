/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import './Garden-Manager.scss';
// import CustomChart from '../../custom-chart/custom-chart';
// import { WS_EVENTS } from '../../../../shared/constants';
import Connection from '../../../connection';

export default class extends Component {
  constructor() {
    super();
    document.title = 'Garden Manager';
    this.dataEndPoint = '/apis/AI-ML/data/1/A1-01'; // Get data from gardenId = 4
    this.state = {
      trainLog: ''
    };
  }

  componentDidMount() {
    Connection.socket.on('environment', (msg) => {
      this.setState((state) => ({
        trainLog: `${state.trainLog}${JSON.stringify(msg)}\r\n`
      }));
    });
    Connection.socket.on('command', (msg) => {
      this.setState((state) => ({
        trainLog: `${state.trainLog}${JSON.stringify(msg)}\r\n`
      }));
    });
  }

  componentWillUnmount() {
    Connection.socket.removeAllListeners();
  }

  handleChange(e) {
    const {name} = e.currentTarget;
    const { value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  onStartTrain() {
    const rs = fetch('/apis/AI-ML/train', {
      method: 'get'
    });
    return rs;
  }

  render() {
    return (
      <React.Fragment>
        <section className="p-3">
          <div className="section-title">
            <h3>Garden Status</h3>
          </div>
          <div className="section-content px-3">
            <textarea style={{width: '100%', height: '500px'}} value={this.state.trainLog} onChange={this.handleChange.bind(this)} name="trainLog" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
