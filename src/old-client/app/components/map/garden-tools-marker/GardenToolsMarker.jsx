import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './GardenToolsMarker.scss';

import { GardenToolsSrc } from '../../../../assets/icons';

const CUSTOM_CLASS = 'garden-tools';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;

export default class GardenToolsMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  constructor(props) {
    super(props);
    this.marker = null;
    this.onBuy = this.onBuy.bind(this);
    this.onLoad = this.onLoad.bind(this);
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

  onBuy() {
    alert(`Cảm ơn đã mua hàng tại ${this.props.name}!`);
  }

  render() {
    const goods = [
      {
        preview: 'https://thapxanh.com/images/thumbs/0009510_bo-dung-cu-lam-vuon-3-mon-can-go.jpeg',
        name: 'Bộ dụng cụ mini 01'
      },
      {
        preview: 'https://caycanhhanoi.com/wp-content/uploads/2015/10/binh-xit-ap-suat-4.jpg',
        name: 'Bình xịt tưới cây'
      },
      {
        preview: 'http://picfood.vn/wp-content/uploads/2016/11/1-42.jpg',
        name: 'Cải chíp'
      },
      {
        preview: 'https://hatgiongphuongnam.com/asset/upload/image/sup-lo-san-ho-2.1_.jpg',
        name: 'Súp lơ san hô'
      },
      {
        preview: 'https://massageishealthy.com/wp-content/uploads/2018/08/tac-dung-cua-ca-rot-song-luoc-voi-da-mat-lam-dep-suc-khoe-giam-can-4.jpg',
        name: 'Cà rốt'
      },
      {
        preview: 'http://image.baoangiang.com.vn/news/2015/20150914/fckimage/41584549_1441559095-swiss-chard-rainbow.jpg',
        name: 'Cải bảy màu'
      },
      {
        preview: 'https://thapxanh.com/images/thumbs/0001308_hat-giong-cu-cai-cherry-do_550.jpeg',
        name: 'Củ cải cherry'
      },
      {
        preview: 'https://image.vtcns.com/files/ctv.suckhoe2/2016/08/25/5v3xcm526wsamza5ahp2-mon-an-bai-thuoc-tu-cu-cai-trang-0747.jpg',
        name: 'Củ cải trắng'
      }
    ];
    goods.push(...goods);
    const { name } = this.props;
    return (
      <MarkerWithInfo
        {...this.props}
        ref={this.onLoad}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
      >
        <div className="store-header mx-3 mt-3">
          <div className="store-branding">Cửa hàng {name}</div>
          <img className="store-eaves" src="/images/eaves.png" alt="" />
        </div>
        <div className="store-body">
          Danh mục sản phẩm
          <div className="row mx-0">
            {goods.map(good => (
              <div className="col col-3 p-3 text-center" key={good.name}>
                <div className="preview-image"><img alt={good.name} src={good.preview} /></div>
                <div>{good.name}</div>
                <button
                  type="button"
                  className="btn btn-sm btn-success px-3"
                  onClick={this.onBuy}
                >miễn phí
                </button>
              </div>
            ))}
          </div>
        </div>
      </MarkerWithInfo>
    );
  }
}

GardenToolsMarker.propTypes = {
  iconSrc: PropTypes.string
};

GardenToolsMarker.defaultProps = {
  iconSrc: GardenToolsSrc
};
