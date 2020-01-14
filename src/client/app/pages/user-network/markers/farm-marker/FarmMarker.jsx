/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { PageMarker } from '../../../../components/map';
import './FarmMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../../assets/icons';
import { FarmSrc as FarmImageSrc } from '../../../../../assets/images';
import Video from '../../../../components/utils/video/Video';


export default class FarmMarker extends PageMarker {
  get customClass() {
    return 'farm';
  }

  constructor(props) {
    super(props);
    this.onStartConversation = this.onStartConversation.bind(this);
  }

  onStartConversation() {
    // alert(`Hello Guy! I'm ${this.props.name}`);
    return this.props.name;
  }

  renderHeader() {
    const {
      place: {
        name,
        video,
        cover
      } = {}
    } = this.props;
    return (
      <React.Fragment>
        <div className="marker__page__title">Nông Trại ❝{name}❞</div>
        {video ? (
          <Video title={name} preview={cover || FarmImageSrc} src={video} />
        ) : (
          <img className="marker__page__banner" src={cover || FarmImageSrc} alt="" />
        )}
        {this.renderZoomTool()}
      </React.Fragment>
    );
  }
}

FarmMarker.propTypes = {
  icon: PropTypes.string
};

FarmMarker.defaultProps = {
  icon: FarmIconSrc
};
