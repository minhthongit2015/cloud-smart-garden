import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './FarmMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../assets/icons';
import { FarmSrc as FarmImageSrc } from '../../../../assets/images';

const CUSTOM_CLASS = 'farm';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;


export default class SupplierMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  constructor(props) {
    super(props);
    this.marker = null;
    this.onLoad = this.onLoad.bind(this);
    this.onStartConversation = this.onStartConversation.bind(this);
  }

  onLoad(ref) {
    this.marker = ref;
  }

  open() {
    this.marker.open();
  }

  close() {
    this.marker.close();
  }

  toggle() {
    this.marker.toggle();
  }

  onStartConversation() {
    // alert(`Hello Guy! I'm ${this.props.name}`);
    return this.props.name;
  }

  render() {
    const { name } = this.props;
    return (
      <MarkerWithInfo
        {...this.props}
        ref={this.onLoad}
        onOpen={this.onOpen}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
      >
        <div className="farm-header mx-3 mt-3">
          <div className="farm-branding">Nông trại <span className="text-nowrap">{name}</span></div>
          <img className="farm-illustration" src={FarmImageSrc} alt="" />
        </div>
        <div className="farm-body mb-3">
          <div className="farm-actions">
            <div>
              <button type="button" className="btn btn-sm btn-default px-3"><i className="fab fa-font-awesome-flag" /> Nhờ chăm sóc</button>
              <button type="button" className="btn btn-sm btn-default px-3"><i className="far fa-paper-plane" /> Kết nối đến vườn khác</button>
            </div>
            <div>
              <button type="button" className="btn btn-sm btn-default px-3"><i className="fas fa-leaf" /> Bật nhận chăm sóc</button>
              <button type="button" className="btn btn-sm btn-default px-3"><i className="fas fa-headset" /> Bật nhận tư vấn</button>
            </div>
          </div>
          <div className="farm-info">
            <div className="farm-info__header py-3 color-default">Thông Tin Vườn</div>
            <div className="farm-info__body">
              <section className="farm-section">
                <div className="farm-section__title">Nông sản miễn phí</div>
                <div className="farm-section__content">
                  <div>Cà Chua</div>
                  <div>Cải ngọt</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </MarkerWithInfo>
    );
  }
}

SupplierMarker.propTypes = {
  iconSrc: PropTypes.string
};

SupplierMarker.defaultProps = {
  iconSrc: FarmIconSrc
};
