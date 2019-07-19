import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './UserMarker.scss';

import { PlantPot1Src } from '../../../assets/icons';

const CUSTOM_MARKER_CLASS = 'user-marker-window';

export default class UserMarker extends Component {
  get marker() {
    return this.markerRef.current;
  }

  constructor(props) {
    super(props);

    this.markerRef = React.createRef();
    this.onStartConversation = this.onStartConversation.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onOpen() {
    this.marker.infoWindowWrapper.addClass(CUSTOM_MARKER_CLASS);
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

  onStartConversation() {
    alert(`Hello Guy! I'm ${this.props.name}`);
  }

  render() {
    const { name } = this.props;
    return (
      <MarkerWithInfo ref={this.markerRef} {...this.props} onOpen={this.onOpen}>
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
          <div className="actions">
            <button
              type="button"
              className="btn btn-default btn-sm px-3"
              onClick={this.onStartConversation}
            >Call
            </button>
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
