import React from 'react';
import {
  MDBModalBody,
  MDBBtn,
  MDBInput
} from 'mdbreact';
import MapService from '../../../services/map/MapService';
import SocialService from '../../../services/social/SocialService';
import PostHelper from '../../../helpers/PostHelper';
import BaseDialog from '../../dialogs/BaseDialog';
import DropUploader from '../../form/inputs/drop-uploader/DropUploader';
import ZoomInput from '../zoom-input/ZoomInput';


export default class BaseEditingDialog extends BaseDialog {
  // eslint-disable-next-line class-methods-use-this
  get wavesHeader() {
    return true;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.setContent,
      this.handleInputChange, this.handleSubmit,
      this.handleLinkChange, this.setZoomToRecommeded, this.zoomToMap
    );

    const superState = this.state || super.state;
    this.state = {
      ...superState,
      place: null,
      marker: null,
      content: null
    };
  }

  setContent(content) {
    this.setState({
      content
    }, this.show);
  }

  show(place, marker) {
    this.setState({
      place,
      marker
    }, this.open);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setPlaceState(name, value);
  }

  handleLinkChange(event) {
    const { name, value, dataset: { type } } = event.target;
    this.setState({
      [name]: value
    });
    if (!type) {
      SocialService.getByOrder(PostHelper.extractPostOrder(value))
        .then((res) => {
          if (!res || !res.data) {
            return;
          }
          this.setPlaceState('post', res.data[0]);
        });
    } else {
      this.setPlaceState(name, value);
      MapService.fetchPlace(MapService.extractPlaceOrder(value))
        .then((res) => {
          if (!res || !res.data) {
            return;
          }
          this.setPlaceState(name, res.data[0]);
        });
    }
  }

  setPlaceState(name, value) {
    this.setState((prevState) => {
      prevState.place[name] = value;
      return {
        place: prevState.place
      };
    }, () => this.forceUpdate());
  }

  setZoomToRecommeded() {
    if (!window.map) return;
    this.setPlaceState('zoom', window.map.getZoom());
  }

  zoomToMap(event) {
    if (!window.map) return;
    const { dataset: { zoom } } = event.currentTarget;
    const { place, marker } = this.state;
    if (zoom != null && zoom !== '') {
      window.map.setZoom(+zoom);
      window.map.panTo(place.position);
      marker.close();
      setTimeout(() => {
        marker.open();
      }, 500);
    }
  }

  handleSubmit(event) {
    this.stopEvent(event);
    this.setState({
      disabled: true
    }, () => {
      this.state.marker.refresh();
      MapService.update(this.state.place)
        .then(() => {
          this.setState({
            disabled: false
          }, this.close);
        })
        .catch(() => {
          this.setState({
            disabled: false
          });
        });
    });
  }

  // eslint-disable-next-line class-methods-use-this
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
          label="Tên địa điểm"
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

  renderActions() {
    return (
      <div className="text-right">
        <MDBBtn onClick={this.close} color="light" size="sm">Bỏ</MDBBtn>
        <MDBBtn type="submit" size="sm">Lưu</MDBBtn>
      </div>
    );
  }

  renderBody() {
    const { content } = this.state;
    return (
      <MDBModalBody>
        <form onSubmit={this.handleSubmit}>
          {content || this.renderForm()}
          {this.renderActions()}
        </form>
      </MDBModalBody>
    );
  }
}
