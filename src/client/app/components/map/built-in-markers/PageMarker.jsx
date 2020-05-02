/* eslint-disable class-methods-use-this */
import React from 'react';
import './PageMarker.scss';
import Place from '../place/Place';
import Video from '../../utils/video/Video';


import { FarmSrc as FarmIconSrc } from '../../../../assets/icons';
import { FarmImgSrc } from '../../../../assets/images';

export default class PageMarker extends Place {
  get customClass() {
    return 'page';
  }

  get markerIcon() {
    return FarmIconSrc;
  }

  get defaultCoverImage() {
    return FarmImgSrc;
  }

  get title() {
    const { place: { title, createdBy: { name } = {} } = {} } = this.props;
    return (
      `❝${title || name || 'Chưa Đặt Tên'}❞`
    );
  }

  renderHeader() {
    const {
      place: {
        video,
        cover
      } = {}
    } = this.props;
    return (
      <React.Fragment>
        <div className="marker__page__before-title">{this.placeTypeTitle}</div>
        <div className="marker__page__title">{this.title}</div>
        <div className="marker__page__banner">
          {video ? (
            <Video title={this.title} preview={cover || this.defaultCoverImage} src={video} />
          ) : (
            <img src={cover || this.defaultCoverImage} alt="" />
          )}
        </div>
        {this.renderZoomTool()}
      </React.Fragment>
    );
  }

  renderBody() {
    const { place: { content } = {} } = this.props;
    return (
      <section>
        {content}
      </section>
    );
  }
}
