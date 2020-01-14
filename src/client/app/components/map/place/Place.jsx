/* eslint-disable class-methods-use-this */
import React from 'react';
import MarkerWithPopup from '../marker-with-popup/MarkerWithPopup';
import UserService from '../../../services/user/UserService';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import MapService from '../../../services/map/MapService';
import './Place.scss';
import FbService from '../../../services/user/FbService';


export default class Place extends MarkerWithPopup {
  get customClass() {
    return 'place';
  }

  get circleProps() {
    const { place: { position: center, radius } = {} } = this.props;
    return {
      center,
      radius
    };
  }

  get markerProps() {
    const { place: { name, position } = {} } = this.props;
    return {
      ...super.markerProps,
      name,
      position
    };
  }

  get popupProps() {
    return {
      ...super.popupProps,
      onOpen: this.handleOpen,
      onClose: this.handleClose
    };
  }

  constructor(props) {
    super(props);
    this.bind(this.handleOpen, this.handleClose);
  }

  handleOpen(...args) {
    MapService.openPlace(this.props.place);
    this.dispatchEvent(...args);
  }

  handleClose(...args) {
    MapService.closePlace();
    this.dispatchEvent(...args);
  }

  renderZoomTool() {
    const { place: { zoom } = {} } = this.props;
    return <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />;
  }

  renderHeader() {
    const {
      place,
      place: {
        name: placeName,
        avatar,
        cover,
        description,
        user,
        author,
        zoom = 17
      } = {}
    } = this.props;
    const {
      name = UserService.user.name,
      socialPoint,
      socials: { facebook } = {}
    } = user || author || {};
    const fbAvatar = facebook && FbService.buildAvatarUrl(facebook);
    const defaultDescription = 'cá nhân hoạt động vì môi trường';
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
        avatar,
        cover,
        description,
        user,
        author,
        zoom = 17
      } = {}
    } = this.props;
    const {
      name = UserService.user.name,
      socialPoint,
      socials: { facebook } = {}
    } = user || author || {};
    const fbAvatar = facebook && FbService.buildAvatarUrl(facebook);
    const defaultDescription = 'cá nhân hoạt động vì môi trường';
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = UserService.fbAvatarSrc;

    return (
      <div className="marker__profile px-3 pb-3">
        <div className="marker__profile__name my-2">{placeName || name}</div>
        <div className="marker__profile__description">{description || defaultDescription}</div>
        <div className="marker__profile__social-point my-2">Điểm cộng đồng: <b>{socialPoint}</b></div>
        <hr className="my-2 mx-5" />
        <PlaceActions place={place} marker={this} />
      </div>
    );
  }

  renderContent() {
    return (
      <React.Fragment>
        <div className="marker__header">
          {this.renderHeader()}
        </div>
        <div className="marker__body">
          {this.renderBody()}
          <PlaceActions place={this.props.place} marker={this} />
        </div>
      </React.Fragment>
    );
  }
}
