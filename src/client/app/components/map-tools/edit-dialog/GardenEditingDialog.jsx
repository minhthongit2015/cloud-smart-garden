import React from 'react';
import { MDBInput } from 'mdbreact';
import DropUploader from '../../form/inputs/drop-uploader/DropUploader';
import ZoomInput from '../zoom-input/ZoomInput';
import BaseEditingDialog from './BaseEditingDialog';


export default class extends BaseEditingDialog {
  renderForm() {
    const { place } = this.state;
    const {
      createdBy, title, content, previewPhoto, zoom
    } = place || {};
    if (!createdBy) {
      return null;
    }

    return (
      <React.Fragment>
        <MDBInput
          label="Tên vườn"
          name="title"
          value={title}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
        <DropUploader
          label="Tải ảnh bìa"
          name="previewPhoto"
          value={previewPhoto}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
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
