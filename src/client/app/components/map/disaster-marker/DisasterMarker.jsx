import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './DisasterMarker.scss';

import { ForestFireSrc as DisasterIconSrc } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import PostService from '../../../services/PostService';
import Video from '../../utils/video/Video';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';


export default class DisasterMarker extends MarkerWithInfo {
  static get customClass() {
    return 'disaster';
  }

  renderContent() {
    const {
      name, entity: place = {}, events
    } = this.props;
    const { post = {}, zoom } = place;
    const {
      title, summary, preview, video
    } = post;

    return (
      <div>
        <div className="marker__header mx-3 mt-3">
          <div className="marker__title">{name || title}</div>
          {video ? (
            <Video title={title} preview={preview} src={video} />
          ) : (
            <img className="marker__banner" src={preview} alt="" />
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
                  <a href={PostService.buildPostUrl(post)}>
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
              <div key={event._id}>
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

DisasterMarker.propTypes = {
  iconSrc: PropTypes.string
};

DisasterMarker.defaultProps = {
  iconSrc: DisasterIconSrc
};
