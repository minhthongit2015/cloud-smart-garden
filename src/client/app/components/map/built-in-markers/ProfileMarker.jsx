/* eslint-disable class-methods-use-this */
import React from 'react';
import UserService from '../../../services/user/UserService';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';
import FbService from '../../../services/user/FbService';
import Place from '../place/Place';
import './ProfileMarker.scss';


export default class ProfileMarker extends Place {
  get customClass() {
    return 'profile';
  }

  get defaultDescription() {
    return 'Chuyên gia thực vật học';
  }

  renderHeader() {
    const {
      place: {
        avatar,
        cover,
        user,
        author,
        zoom = 17
      } = {}
    } = this.props;
    const {
      socials: { facebook } = {}
    } = user || author || {};
    const fbAvatar = facebook && FbService.buildAvatarUrl(facebook);
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = UserService.fbAvatarSrc;

    return (
      <div className="marker__profile">
        <div className="marker__profile__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
          <img alt="" src={cover || defaultCover} />
          <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
        </div>
        <div className="marker__profile__avatar">
          <img alt="" src={avatar || fbAvatar || defaultAvatar} />
        </div>
      </div>
    );
  }

  renderBody() {
    const {
      place: {
        name: placeName,
        description,
        user,
        author
      } = {}
    } = this.props;
    const {
      name = UserService.user.name,
      socialPoint
    } = user || author || {};

    return (
      <div className="marker__profile">
        <div className="marker__profile__name">{placeName || name}</div>
        <div className="marker__profile__description">{description || this.defaultDescription}</div>
        <div className="marker__profile__social-point">Điểm cộng đồng: <b>{socialPoint || 0}</b></div>
        <hr className="my-2 mx-5" />
      </div>
    );
  }
}
