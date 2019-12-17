import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseEditingDialog from './BaseEditingDialog';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import ZoomInput from '../zoom-input/ZoomInput';


export default class ActivistDialog extends BaseEditingDialog {
  static get type() { return 'Activist'; }

  // get place() {
  //   const originPlace = super.place;
  //   const { place } = this.state;
  //   const { description } = place;
  //   return {
  //     ...originPlace,
  //     description
  //   };
  // }

  renderContent() {
    const { place = {} } = this.state;
    const {
      user, author, name: placeName, description, cover, zoom, avatar
    } = place;
    const { name } = user || author || {};

    return (
      <React.Fragment>
        <DropUploader
          label="Tải ảnh bìa"
          name="cover"
          value={cover}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <DropUploader
          label="Tải ảnh đại diện"
          name="avatar"
          value={avatar}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <MDBInput
          label="Tên"
          name="name"
          value={placeName || name}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          required
        />
        <MDBInput
          label="Giới thiệu"
          name="description"
          value={description}
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
