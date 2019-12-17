/* eslint-disable class-methods-use-this */
import React from 'react';
import BasePage from '../_base/BasePage';
import './MyGarden.scss';

import superws from '../../utils/superws';
// import CustomChart from '../../custom-chart/custom-chart';

export default class extends BasePage {
  constructor(props) {
    super(props);
    this.title = 'My Garden';

    this.dataEndpoint = '/apis/AI-ML/data/1/A1-01'; // Get data from gardenId = 4
    this.state = {
      trainLog: ''
    };
  }

  componentDidMount() {
    super.componentDidMount();
    superws.on('environment', (msg) => {
      this.setState(state => ({
        trainLog: `${state.trainLog}${JSON.stringify(msg)}\r\n`
      }));
    });
    superws.on('command', (msg) => {
      this.setState(state => ({
        trainLog: `${state.trainLog}${JSON.stringify(msg)}\r\n`
      }));
    });
  }

  componentWillUnmount() {
    superws.socket.removeAllListeners();
  }

  handleChange(e) {
    const { name } = e.currentTarget;
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
    console.log('render "Pages/my-garden/MyGarden.jsx"');
    return (
      <React.Fragment>
        <section className="p-3">
          <div className="section-title">
            <h3>Garden Status</h3>
          </div>
          <div className="section-content px-3">
            <textarea style={{ width: '100%', height: '500px' }} value={this.state.trainLog} onChange={this.handleChange.bind(this)} name="trainLog" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
