/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './ActivistMarker.scss';

import { PlantPot1Src } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import UserService from '../../../services/UserService';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';

export default class ActivistMarker extends MarkerWithInfo {
  static get customClass() {
    return 'activist';
  }

  renderContent() {
    const { entity: place = {} } = this.props;
    const {
      name: placeName,
      avatar,
      cover,
      description,
      user,
      author,
      zoom = 17
    } = place;
    const {
      name = UserService.user.name,
      socialPoint,
      socials: { facebook } = {}
    } = user || author || {};
    const fbAvatar = facebook && `https://graph.facebook.com/${facebook}/picture?type=square&width=200&height=200`;
    const defaultDescription = 'cá nhân hoạt động vì môi trường';
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = UserService.fbAvatarSrc;

    return (
      <div>
        <div className="marker__header">
          <div className="marker__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
            <img alt="" src={cover || defaultCover} />
            <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
          </div>
          <div className="marker__avatar">
            <img alt="" src={avatar || fbAvatar || defaultAvatar} />
          </div>
        </div>
        <div className="marker__profile px-3 pb-3">
          <div className="marker__profile__name my-2">{placeName || name}</div>
          <div className="marker__profile__description">{description || defaultDescription}</div>
          <div className="marker__profile__social-point my-2">Điểm cộng đồng: <b>{socialPoint}</b></div>
          <hr className="my-2 mx-5" />
          <PlaceActions place={place} marker={this} />
        </div>
      </div>
    );
  }
}

ActivistMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

ActivistMarker.defaultProps = {
  iconSrc: PlantPot1Src,
  entity: {}
};
