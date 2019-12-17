/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Peer from 'simple-peer';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './UserMarker.scss';

import { PlantPot1Src, GardenOwnerSrc } from '../../../../assets/icons';

const CUSTOM_CLASS = 'user';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;

export default class UserMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  get rootMarker() {
    return this.marker.rootMarker;
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      isShowCam: false
    };

    this.myPeer = null;
    this.marker = null;

    this.onStartConversation = this.onStartConversation.bind(this);
    this.onWaitConversation = this.onWaitConversation.bind(this);
    this.onSharingFood = this.onSharingFood.bind(this);

    this.onLoad = this.onLoad.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onLoad(ref) {
    this.marker = ref;
    this.setState({
      uid: this.marker.uid
    });
  }

  onClose() {
    if (this.myPeer) {
      this.myPeer.destroy();
      this.myPeer = null;
    }
    this.closeMediaStream();
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
  onSharingFood() {
    alert('Chúc bạn luôn khỏe mạnh (^_^)!');
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
    this.setState({
      isShowCam: false
    });
    if (!window.mediaStream) return;
    window.mediaStream.getTracks().forEach(track => track.stop());
    window.mediaStream = null;
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

    this.setState({
      isShowCam: true
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

    this.setState({
      isShowCam: true
    });
  }

  render() {
    const { name } = this.props;
    const { picture = '/images/avatar.png', cover = '/images/cover-photo.jpg', owned } = this.props.entity;
    const sharedFoods = [
      {
        preview: 'http://picfood.vn/wp-content/uploads/2016/11/1-42.jpg',
        name: 'Cải chíp'
      },
      {
        preview: 'https://hatgiongphuongnam.com/asset/upload/image/sup-lo-san-ho-2.1_.jpg',
        name: 'Súp lơ san hô'
      },
      {
        preview: 'https://massageishealthy.com/wp-content/uploads/2018/08/tac-dung-cua-ca-rot-song-luoc-voi-da-mat-lam-dep-suc-khoe-giam-can-4.jpg',
        name: 'Cà rốt'
      }
    ];

    // const { user } = this.props.data;
    // mapEntities.forEach((entity) => {
    //   entity.owned = entity.users.includes(user._id);
    // });

    return (
      <MarkerWithInfo
        {...this.props}
        ref={this.onLoad}
        onClose={this.onClose}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
        iconSrc={owned ? GardenOwnerSrc : this.props.iconSrc}
      >
        <div className="header">
          <div className="cover-photo" style={{ backgroundImage: `url(${cover})` }}>
            <img alt="" src={cover} />
          </div>
          <div className="avatar">
            <img alt="" src={picture} />
          </div>
        </div>
        <div className="info px-3 pb-3">
          <div className="name">{name}</div>

          <div className="status-line">Have a lovely day!</div>
          <hr className="my-2 mx-5" />

          <div className="description">Funny man</div>
          <hr className="my-2 mx-5" />

          <div className="shared-foods">
            <div className="shared-foods__header">Chia sẻ rau củ sạch</div>
            <div className="row mx-0">
              {sharedFoods.map(food => (
                <div className="col col-4 p-3 text-center" key={food.name}>
                  <div className="preview-image"><img alt={food.name} src={food.preview} /></div>
                  <div>{food.name}</div>
                  <button
                    type="button"
                    className="btn btn-sm btn-success px-3"
                    onClick={this.onSharingFood}
                  >miễn phí
                  </button>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-2 mx-5" />

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

          <div className={classNames('content fade',
            { show: this.state.isShowCam, 'd-none': !this.state.isShowCam })}
          >
            <video id={`vid-${this.state.uid}`} className="border rounded" />
          </div>
        </div>
      </MarkerWithInfo>
    );
  }
}

UserMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

UserMarker.defaultProps = {
  iconSrc: PlantPot1Src,
  entity: {}
};
