/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Peer from 'simple-peer';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './UserMarker.scss';

import { PlantPot1Src } from '../../../assets/icons';

const CUSTOM_MARKER_CLASS = 'user-marker-window';

export default class UserMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: null
    };

    this.myPeer = null;
    this.marker = null;

    this.onStartConversation = this.onStartConversation.bind(this);
    this.onWaitConversation = this.onWaitConversation.bind(this);

    this.onLoad = this.onLoad.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.marker.infoWindowWrapper.addClass(CUSTOM_MARKER_CLASS);
  }

  onClose() {
    if (this.myPeer) this.myPeer.destroy();
    this.closeMediaStream();
  }

  onLoad(ref) {
    this.marker = ref;
    this.setState({
      uid: this.marker.uid
    });
  }

  open() {
    this.marker.open();
  }

  close() {
    this.marker.close();
  }

  toggle() {
    this.marker.toggle();
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserMediaStream() {
    if (window.mediaStream) {
      return window.mediaStream;
    }
    return new Promise((resolve, reject) => {
      navigator.getUserMedia({ video: true, audio: true },
        (stream) => {
          window.mediaStream = stream;
          resolve(stream);
        },
        error => reject(error));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  closeMediaStream() {
    if (!window.mediaStream) return;
    window.mediaStream.getTracks().forEach(track => track.stop());
  }

  async onWaitConversation() {
    this.myPeer = new Peer();
    window.setSignal1 = (data) => {
      this.myPeer.signal(data);
    };
    this.myPeer.on('signal', (data) => {
      window.setSignal2(data);
    });
    this.myPeer.on('connect', () => {
      console.log('Peer wait connected');
      this.getUserMediaStream().then((mediaStream) => {
        this.myPeer.addStream(mediaStream);
      });
    });
    this.myPeer.on('stream', (callerStream) => {
      const video = document.querySelector(`#vid-${this.uid}`);
      if ('srcObject' in video) {
        video.srcObject = callerStream;
      } else {
        video.src = window.URL.createObjectURL(callerStream); // for older browsers
      }
      video.play();
    });
  }

  async onStartConversation() {
    const mediaStream = await this.getUserMediaStream();

    this.myPeer = new Peer({ initiator: true, stream: mediaStream });
    window.setSignal2 = (data) => {
      this.myPeer.signal(data);
    };
    this.myPeer.on('signal', (data) => {
      window.setSignal1(data);
    });
    this.myPeer.on('connect', () => {
      console.log('Peer call connected');
    });

    this.myPeer.on('stream', (waiterStream) => {
      const video = document.querySelector(`#vid-${this.uid}`);
      if ('srcObject' in video) {
        video.srcObject = waiterStream;
      } else {
        video.src = window.URL.createObjectURL(waiterStream); // for older browsers
      }
      video.play();
    });
  }

  render() {
    const { name } = this.props;
    return (
      <MarkerWithInfo ref={this.onLoad} {...this.props} onOpen={this.onOpen} onClose={this.onClose}>
        <div className="header">
          <div className="cover-photo" style={{ backgroundImage: 'url(/images/cover-photo.jpg)' }}>
            <img alt="" src="/images/cover-photo.jpg" />
          </div>
          <div className="avatar">
            <img alt="" src="/images/avatar.png" />
          </div>
        </div>
        <div className="info px-3 pb-3">
          <div className="name">{name}</div>
          <div className="status-line">Have a lovely day!</div>
          <hr className="my-2 mx-5" />
          <div className="description">Funny man</div>
          <hr className="my-2 mx-5" />
          <div className="content">
            <video id={`vid-${this.state.uid}`} />
          </div>
          <div className="actions">
            <div className="row mx-0">
              <button
                type="button"
                className="btn btn-default btn-sm px-3"
                onClick={this.onStartConversation}
              >Call
              </button>
              <button
                type="button"
                className="btn btn-default btn-sm px-3"
                onClick={this.onWaitConversation}
              >Wait
              </button>
            </div>
          </div>
        </div>
      </MarkerWithInfo>
    );
  }
}

UserMarker.propTypes = {
  iconSrc: PropTypes.string
};

UserMarker.defaultProps = {
  iconSrc: PlantPot1Src
};
