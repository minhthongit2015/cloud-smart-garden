import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBWaves,
  MDBBtn
} from 'mdbreact';
import LeafLoading from '../../utils/loadings/LeafLoading';
import MapService from '../../../services/map/MapService';
import SocialService from '../../../services/social/SocialService';
import BaseComponent from '../../_base/BaseComponent';
import PostHelper from '../../../helpers/PostHelper';


export default class BaseEditingDialog extends BaseComponent.Pure {
  static get type() { return 'EditingDialog'; }

  get isOpen() { return this.state && this.state.isShowModal; }

  // eslint-disable-next-line class-methods-use-this
  get fields() {
    return [
      '_id', 'name', 'picture', 'cover', 'video', 'description', 'gallery',
      'link', 'address', 'position', 'zoom', 'path', 'radius',
      'events', 'socials'
    ];
  }

  get place() {
    if (!this.state || !this.state.place) return {};
    const placeState = this.state.place;
    const place = {};
    this.fields.forEach((key) => {
      place[key] = placeState[key];
    });
    return place;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.handleClick, // for waves effect
      this.open, this.close, this.toggle, this.show, this.edit,
      this.handleInputChange, this.handleSubmit, this.handleDiscard,
      this.handleLinkChange, this.setZoomToRecommeded, this.zoomToMap
    );

    this.state = {
      link: '',
      place: {},
      marker: null,
      cursorPos: {},
      isShowModal: false,
      disabled: false,
      title: '❝Climate Strike Vietnam❞'
    };
  }

  handleClick(event) {
    this.stopEvent(event);
    const cursorPos = { top: event.clientY, left: event.clientX, time: Date.now() };
    this.setState({ cursorPos });
  }

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle() {
    if (this.state.disabled) {
      return;
    }
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal
    }));
  }

  show(title) {
    this.setState({
      title
    }, this.open);
  }

  edit(place, marker) {
    this.setState({
      place,
      marker,
      isShowModal: true
    });
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
    });
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
      MapService.updateOrCreatePlace(this.place)
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

  handleDiscard() {
    this.close();
  }

  // eslint-disable-next-line class-methods-use-this
  renderContent() {
    return null;
  }

  renderActions() {
    return (
      <div className="text-right">
        <MDBBtn onClick={this.handleDiscard} color="light" size="sm">Bỏ</MDBBtn>
        <MDBBtn type="submit" size="sm">Lưu</MDBBtn>
      </div>
    );
  }

  render() {
    const {
      title, cursorPos,
      isShowModal, disabled,
      color = 'deep-blue-gradient',
      place
    } = this.state;
    const { noHeader } = this.props;

    return (
      <MDBModal
        isOpen={isShowModal}
        toggle={this.toggle}
        className=""
        style={{ position: 'relative' }}
        disabled={disabled}
      >
        {!noHeader && (
          <div
            className={`modal-header justify-content-center mb-3 p-4 waves-effect ${color}`}
            onMouseDown={this.handleClick}
            onTouchStart={this.handleClick}
          >
            <h5 className="white-text font-weight-bolder m-0">{title}</h5>
            <MDBWaves
              cursorPos={cursorPos}
            />
          </div>
        )}
        <MDBModalBody>
          <form onSubmit={this.handleSubmit}>
            {this.renderContent(place)}
            {this.renderActions()}
          </form>
        </MDBModalBody>
        <LeafLoading overlaping={disabled} text="đang lưu thông tin..." />
      </MDBModal>
    );
  }
}
