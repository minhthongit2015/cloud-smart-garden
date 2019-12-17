import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseEditingDialog from './BaseEditingDialog';
import ZoomInput from '../zoom-input/ZoomInput';


export default class DisasterDialog extends BaseEditingDialog {
  static get type() { return 'Disaster'; }

  get place() {
    const originPlace = super.place;
    const { place } = this.state;
    const post = place.post ? place.post._id : null;
    return {
      ...originPlace,
      post
    };
  }

  renderContent() {
    const { place = {}, link = '' } = this.state;
    const { post = {}, radius, zoom } = place;
    const { title = '' } = post;

    return (
      <React.Fragment>
        <MDBInput
          label="Liên kết đến bài viết"
          name="link"
          value={link}
          onChange={this.handleLinkChange}
          autoComplete="off"
          autofill="off"
        />
        <MDBInput
          label="Tiêu đề"
          name="title"
          value={title}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          required
          disabled
        />
        <MDBInput
          label="Bán kính thảm họa (m)"
          name="radius"
          value={radius}
          onChange={this.handleInputChange}
          type="number"
        />
        <ZoomInput
          hint="Độ thu phóng"
          name="zoom"
          value={zoom}
          onChange={this.handleInputChange}
          onClickRecommend={this.setZoomToRecommeded}
          onClickZoom={this.zoomToMap}
        />
      </React.Fragment>
    );
  }
}
