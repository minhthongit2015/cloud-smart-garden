/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './StrikeMarker.scss';
import { FlagSrc } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import MapService from '../../../services/MapService';
import UserService from '../../../services/UserService';
import LoginDialogService from '../../../services/LoginDialogService';
import t from '../../../languages';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';


export default class StrikeMarker extends MarkerWithInfo {
  static get customClass() {
    return 'strike';
  }

  constructor(props) {
    super(props);
    this.handleGoToPrev = this.handleGoToPrev.bind(this);
    this.handleGoToNext = this.handleGoToNext.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
  }

  handleGoToNext() {
    const { entity: place = {} } = this.props;
    if (place.next) {
      place.ref.close();
      place.next.ref.open();
    }
  }

  handleGoToPrev() {
    const { entity: place = {} } = this.props;
    if (place.prev) {
      place.ref.close();
      place.prev.ref.open();
    }
  }

  handleJoin() {
    if (!UserService.isLoggedIn) {
      LoginDialogService.show(t('components.loginDialog.loginToRiseYourVoice'));
      return;
    }
    const { entity: place = {} } = this.props;
    place.joined = true;
    place.rightAfterJoined = true;
    MapService.joinStrike(place).then(this.updatePlace);
    this.addPath();
  }

  addPath() {
    const { entity: place = {}, mainMap } = this.props;
    const strikerPathEntity = MapService.generateStrikerPath(
      mainMap.state.places, UserService.user._id, place
    );
    if (!strikerPathEntity) {
      return;
    }
    mainMap.addPath(strikerPathEntity);
  }

  handleLeave() {
    if (!UserService.isLoggedIn) {
      LoginDialogService.show(t('components.loginDialog.loginToRiseYourVoice'));
      return;
    }
    const { entity: place = {}, mainMap } = this.props;
    place.joined = false;
    MapService.leaveStrike(place).then(this.updatePlace);
    mainMap.removePath(UserService.user._id, place._id);
  }

  updatePlace(res) {
    if (!res || !res.data) {
      return;
    }
    const { entity: place = {} } = this.props;
    Object.assign(place, res.data);
  }

  renderContent() {
    const { entity: place = {} } = this.props;
    const {
      cover,
      description,
      avatar,
      name,
      zoom,
      address, time,
      prev, next,
      joined, members
    } = place;
    const defaultDescription = 'Cuộc diễu hành kêu gọi chống biến đổi khí hậu';
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = 'https://cms.frontpagemag.com/sites/default/files/styles/article_full/public/uploads/2019/11/gt.jpg?itok=wsbc5NVv';
    let rightAfterJoined = false;
    if (place.rightAfterJoined) {
      rightAfterJoined = true;
      place.rightAfterJoined = false;
    }

    return (
      <div>
        <div className="marker__header">
          <div className="marker__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
            <img alt="" src={cover || defaultCover} />
            <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
          </div>
          <div className="marker__avatar">
            <img alt="" src={avatar || defaultAvatar} />
          </div>
        </div>
        <div className="marker__profile px-3 pb-3">
          <div className="marker__profile__name my-2">{name || 'Greta Thunberg'}</div>
          <div className="marker__profile__description">{description || defaultDescription}</div>
        </div>
        <div className="px-3 pb-3">
          <div className="marker__address">
            <i className="fas fa-map-marker-alt" /> Địa điểm: {address || 'Đang lên lịch trình.'}
          </div>
          <div className="marker__time my-1" title={time && TimeAgo.fromNow(time)}>
            <i className="far fa-clock" /> Thời gian: {(time && TimeAgo.format(time)) || 'Đang lên lịch.'}
          </div>
          <div className={`marker__members text-center my-2 ${!members || !members.length ? 'd-none' : ''}`}>
            <i className="far fa-laugh-wink" /> <b>{members && members.length}</b> người tham gia
          </div>
          <div className="my-2 d-flex justify-content-between">
            <div
              className={`btn btn-sm py-1 px-3 ${prev ? 'btn-none' : 'grey lighten-1 text-white disabled'}`}
              onClick={this.handleGoToPrev}
            >
              <i className="fas fa-chevron-left" /> Điểm Trước
            </div>
            <div
              className={`btn btn-sm py-1 px-3 ${next ? 'btn-none' : 'grey lighten-1 text-white disabled'}`}
              onClick={this.handleGoToNext}
            >
              Điểm Tiếp Theo <i className="fas fa-chevron-right" />
            </div>
          </div>
          <hr className="my-2" />
          <div className="text-center">
            <div
              className={`btn btn-lg py-2 px-4 sunny-morning-gradient text-white ${joined ? 'd-none' : ''}`}
              onClick={this.handleJoin}
            >
              <i className="far fa-laugh-wink" /> {members && members.length ? 'Tham gia' : 'Hãy là người tham gia đầu tiên'}
            </div>
            <div
              className={`btn btn-sm py-1 px-3 ${!joined || rightAfterJoined ? 'd-none' : ''}`}
              onClick={this.handleLeave}
            >
              <i className="far fa-frown" /> Hoãn tham gia
            </div>
            <div className={`${rightAfterJoined ? '' : 'd-none'}`}>
              <i className="far fa-heart red-text" /> Cảm ơn bạn đã tham gia cùng mọi người! <i className="far fa-laugh-wink orange-text" />
            </div>
          </div>
          <hr className="my-2" />
          <PlaceActions place={place} marker={this} />
        </div>
      </div>
    );
  }
}

StrikeMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

StrikeMarker.defaultProps = {
  iconSrc: FlagSrc,
  entity: {}
};
