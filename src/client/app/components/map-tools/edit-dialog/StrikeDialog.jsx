import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseEditingDialog from './BaseEditingDialog';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import ZoomInput from '../zoom-input/ZoomInput';


export default class StrikeDialog extends BaseEditingDialog {
  static get type() { return 'Strike'; }

  get place() {
    const originPlace = super.place;
    const { place } = this.state;
    const {
      prev, next, datez, timez
    } = place;
    return {
      ...originPlace,
      prev: prev && prev._id,
      next: next && next._id,
      time: new Date(`${datez} ${timez}`)
    };
  }

  renderContent() {
    const { place = {} } = this.state;
    const {
      cover, name, description, address, time, next, zoom, datez, timez
    } = place;
    const datez1 = datez || (time && time.split('T')[0]);
    const timez1 = timez || (time && time.split('T')[1].slice(0, -1));

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
        <MDBInput
          label="Tiêu đề"
          name="name"
          value={name}
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
        <MDBInput
          label="Địa điểm"
          name="address"
          value={address}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
        <div className="row d-flex">
          <div className="col">
            <MDBInput
              label="Ngày"
              name="datez"
              type="date"
              value={datez1}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
            />
          </div>
          <div className="col">
            <MDBInput
              label="Giờ"
              name="timez"
              type="time"
              value={timez1}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
            />
          </div>
        </div>
        <MDBInput
          label="Địa điểm tiếp theo (url hoặc id)"
          name="next"
          data-type="place"
          value={typeof next === 'object' ? ((`${next.name} (${(next.address || '').slice(0, 15) || '...'})`) || next.baseOrder) : next}
          onChange={this.handleLinkChange}
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
