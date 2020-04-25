import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithPopup from '../../marker-with-popup/MarkerWithPopup';
import './ActionMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../../assets/icons';
import PlaceActions from '../../../map-tools/place-actions/PlaceActions';
import Video from '../../../utils/video/Video';
import ZoomTool from '../../../map-tools/zoom-tool/ZoomTool';
import PostHelper from '../../../../helpers/PostHelper';


export default class ActionMarker extends MarkerWithPopup {
  static get customClass() {
    return 'action';
  }

  renderContent() {
    const {
      name, entity: place = {}, events
    } = this.props;
    const { post = {}, zoom } = place;
    const {
      title, summary, previewPhoto, video
    } = post;

    return (
      <div>
        <div className="marker__header mx-3 mt-3">
          <div className="marker__title">{name || title}</div>
          {video ? (
            <Video title={title} preview={previewPhoto} src={video} />
          ) : (
            <img className="marker__banner" src={previewPhoto} alt="" />
          )}
          <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
        </div>
        <div className="marker__body mb-3">
          <section className="marker__section marker__post">
            {name && <div className="marker__section__header py-3 color-default">{title}</div>}
            <div className="marker__section__body">
              <div className="marker__section__summary">{summary}</div>
              <div className="marker__section__actions">
                <div>
                  {/* <button type="button" className="btn btn-sm btn-default px-3">
                    <i className="fab fa-font-awesome-flag" /> Chia sẻ
                  </button> */}
                  <a href={PostHelper.buildPostUrl(post)}>
                    <button
                      type="button"
                      className="btn btn-sm btn-default px-3"
                      onClick={this.handleGoToPost}
                    >
                      <i className="far fa-paper-plane" /> Đọc chi tiết
                    </button>
                  </a>
                </div>
                <PlaceActions place={place} marker={this} />
              </div>
            </div>
          </section>
          <section className="marker__section">
            {events && events.map(event => (
              <div>
                <div className="marker__section__header">{event.title}</div>
                <div className="marker__section__body">
                  {event.title}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
}

ActionMarker.propTypes = {
  iconSrc: PropTypes.string
};

ActionMarker.defaultProps = {
  iconSrc: FarmIconSrc
};
