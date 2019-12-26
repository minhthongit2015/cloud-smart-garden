import React from 'react';
import {
  Card, CardHeader, CardBody, MDBBtn
} from 'mdbreact';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import superrequest from '../../../utils/superrequest';
import TimeAgo from '../../../components/utils/time-ago/TimeAgo';
import ApiEndpoints from '../../../utils/ApiEndpoints';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'));
    this.setGuideMessage(`${t('pages.myGarden.message.myGarden')} 🥳`);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      lastCheckpoint: 0,
      temperature: 0,
      humidity: 0,
      light: 0,
      pump: false,
      led: false
    };
  }

  componentDidMount() {
    super.componentDidMount();
    superrequest.on('stateChange', (state) => {
      delete state.pump;
      delete state.led;
      this.setState({
        lastCheckpoint: Date.now(),
        ...state
      });
    });
    superrequest.on('accept', (msg) => {
      console.log(msg);
    });
  }

  componentWillUnmount() {
    superrequest.removeAllListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  handleToggle(event) {
    const { target: { name } } = event;
    superrequest.post(ApiEndpoints.setStationState, {
      [name]: !this.state[name]
    });
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const {
      temperature = 0, humidity = 0, light = 0, pump = false, led = false, lastCheckpoint
    } = this.state;

    return (
      <Card className="w-50 mx-auto mt-5">
        <CardHeader>Vườn 01</CardHeader>
        <CardBody>
          <div>Chỉ số (<small><TimeAgo time={lastCheckpoint} /></small>):</div>
          <table className="w-100">
            <tbody>
              <tr>
                <td>Nhiệt độ</td>
                <td>{temperature.toFixed(2)}°C</td>
              </tr>
              <tr>
                <td>Độ ẩm</td>
                <td>{humidity.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Ánh sáng</td>
                <td>{light.toLocaleString()} lux</td>
              </tr>
            </tbody>
          </table>
          <hr className="mx-4" />
          <div className="text-right">
            <MDBBtn
              name="pump"
              onClick={this.handleToggle}
              size="sm"
              color={pump ? 'default' : 'none'}
            >Bơm
            </MDBBtn>
            <MDBBtn
              name="led"
              onClick={this.handleToggle}
              size="sm"
              color={led ? 'default' : 'none'}
            >Đèn
            </MDBBtn>
          </div>
        </CardBody>
      </Card>
    );
  }
}
