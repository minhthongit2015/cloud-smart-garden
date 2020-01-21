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
    const {
      place: {
        name
      } = {}
    } = this.props;
    return name;
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
        <div className="marker__page__before-title">{this.placeTypeTitle}</div>
        <div className="marker__page__title">{this.title || name}</div>
        <div className="marker__page__banner">
          {video ? (
            <Video title={name} preview={cover || this.defaultCoverImage} src={video} />
          ) : (
            <img src={cover || this.defaultCoverImage} alt="" />
          )}
        </div>
        {this.renderZoomTool()}
      </React.Fragment>
    );
  }

  renderBody() {
    const { place: { description } = {} } = this.props;
    return (
      <React.Fragment>
        <section>
          {description}
        </section>
      </React.Fragment>
    );
  }
}
