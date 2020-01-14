/* eslint-disable class-methods-use-this */
import React from 'react';
import './PageMarker.scss';
import Place from '../place/Place';
import Video from '../../utils/video/Video';


export default class PageMarker extends Place {
  get customClass() {
    return 'page';
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
        <div className="marker__page__branding">{name}</div>
        <div>
          {video ? (
            <Video title={name} preview={cover} src={video} />
          ) : (
            <img className="marker__page__banner" src={cover} alt="" />
          )}
        </div>
        {this.renderZoomTool()}
      </React.Fragment>
    );
  }

  renderBody() {
    const {
      place: {
        description
      } = {}
    } = this.props;
    return (
      <React.Fragment>
        <section>
          {description}
        </section>
      </React.Fragment>
    );
  }
}
