/* eslint-disable class-methods-use-this */
import React from 'react';
import UserService from '../../../services/user/UserService';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import './ProfileMarker.scss';
import FbService from '../../../services/user/FbService';
import Place from '../place/Place';


export default class ProfileMarker extends Place {
  get customClass() {
    return 'profile';
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
      <React.Fragment>
        <div className="marker__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
          <img alt="" src={cover || defaultCover} />
          <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
        </div>
        <div className="marker__avatar">
          <img alt="" src={avatar || fbAvatar || defaultAvatar} />
        </div>
      </React.Fragment>
    );
  }

  renderBody() {
    const {
      place,
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
    const defaultDescription = 'cá nhân hoạt động vì môi trường';

    return (
      <div className="marker__profile px-3 pb-3">
        <div className="marker__profile__name my-2">{placeName || name}</div>
        <div className="marker__profile__description">{description || defaultDescription}</div>
        <div className="marker__profile__social-point my-2">Điểm cộng đồng: <b>{socialPoint || 0}</b></div>
        <hr className="my-2 mx-5" />
        <PlaceActions place={place} marker={this} />
      </div>
    );
  }
}
