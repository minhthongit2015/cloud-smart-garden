/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import './AIMLManager.scss';
// import CustomChart from '../../custom-chart/custom-chart';
// import { WS_EVENTS } from '../../../../shared/constants';
import Connection from '../../../connection';

export default class extends Component {
  constructor() {
    super();
    document.title = 'AI/ML Manager';
    this.dataEndPoint = '/apis/AI-ML/data/1/A1-01'; // Get data from gardenId = 4
    this.state = {
      trainLog: ''
    };
  }

  componentDidMount() {
    Connection.socket.on('train-progress', (msg) => {
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
            <h3>Training Model</h3>
          </div>
          <div className="section-content px-3">
            <div className="row train-options">
              <div className="d-flex px-2">
                <div className="md-form">
                  <div htmlFor="optimizer" className="mb-2 d-block">Optimizer</div>
                  <select className="browser-default custom-select" id="optimizer">
                    <option value="sgd" defaultValue>SGD</option>
                    <option value="adam">Adam</option>
                    <option value="momentum" disabled>Momentum</option>
                    <option value="Adagrad" disabled>Adagrad</option>
                    <option value="Adadelta" disabled>Adadelta</option>
                  </select>
                </div>
              </div>
              <div className="d-flex px-2">
                <div className="md-form">
                  <div htmlFor="loss-function" className="mb-2 d-block">Loss Function</div>
                  <select className="browser-default custom-select" id="loss-function">
                    <option value="categoricalCrossentropy" defaultValue>Categorical Crossentropy</option>
                    <option value="2" disabled>Mean Squared Error</option>
                    <option value="2" disabled>logLoss</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button type="button" className="btn btn-primary btn-md" onClick={this.onStartTrain.bind(this)}>Start Train</button>
            </div>
            <textarea style={{width: '100%', height: '300px'}} value={this.state.trainLog} onChange={this.handleChange.bind(this)} name="trainLog" />
            {/* <CustomChart dataEndPoint={this.dataEndPoint} title="Temperature/Humidity" /> */}
          </div>
        </section>

        {/* <section>
          <div className="section-title">
            <h3>Nhiệt độ & độ ẩm</h3>
          </div>
        </section>

        <section>
          <div className="section-title">
            <h3>Ánh sáng</h3>
          </div>
        </section>

        <section>
          <div className="section-title">
            <h3>Dinh dưỡng</h3>
          </div>
        </section> */}
      </React.Fragment>
    );
  }
}
