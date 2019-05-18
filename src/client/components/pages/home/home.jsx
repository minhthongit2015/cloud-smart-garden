import React, { Component } from 'react';
import './styles.scss';
import { WS_EVENTS } from '../../../../shared/constants';

export default class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Home';
    
    // eslint-disable-next-line no-undef
    this.socket = io('http://localhost:4000');
    this.socket.on(WS_EVENTS.command, (msg) => {
      const messages = document.getElementById('messages');
      messages.value += `\r\n[Command]: ${JSON.stringify(msg)}`;
    });
  }

  sendMessage() {
    const msg = document.getElementById('msg');
    const messages = document.getElementById('messages');
    this.socket.emit(WS_EVENTS.message, msg.value, (response) => {
      messages.value += `\r\n${response}`;
    });
    msg.value = '';
  }

  render() {
    return (
      <React.Fragment>
        <textarea id="messages" style={{width: '100%', height: '100%'}} />
        <form action="">
          <input id="msg" autoComplete="off" />
          <button type="button" onClick={this.sendMessage.bind(this)}>Send</button>
        </form>
      </React.Fragment>
    );
  }
}
