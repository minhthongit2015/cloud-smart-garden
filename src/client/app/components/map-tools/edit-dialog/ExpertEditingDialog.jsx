import React from 'react';
import { MDBInput } from 'mdbreact';
import DropUploader from '../../form/inputs/drop-uploader/DropUploader';
import ZoomInput from '../zoom-input/ZoomInput';
import BaseEditingDialog from './BaseEditingDialog';
import { MarkerTypes } from '../../../utils/Constants';


export default class extends BaseEditingDialog {
  // eslint-disable-next-line class-methods-use-this
  get model() {
    return MarkerTypes.expert;
  }

  renderForm() {
    const { place } = this.state;
    const {
      createdBy, title, content, avatar, previewPhoto, zoom
    } = place || {};
    if (!createdBy) {
      return null;
    }
    const { name } = createdBy;

    return (
      <React.Fragment>
        <DropUploader
          label="Tải ảnh bìa"
          name="previewPhoto"
          value={previewPhoto}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <DropUploader
          avatar
          label="Tải ảnh đại diện"
          name="avatar"
          value={avatar}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <MDBInput
          label="Tên"
          name="title"
          value={title || name}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
        <MDBInput
          label="Giới thiệu"
          name="content"
          value={content}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
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
