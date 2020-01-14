/* eslint-disable class-methods-use-this */
import { PageMarker } from '.';
import './StoreMarker.scss';

import { ShoppingCartSrc } from '../../../../assets/icons';
import { FoodStoreSrc } from '../../../../assets/images';


export default class StoreMarker extends PageMarker {
  get customClass() {
    return 'store';
  }

  get markerIcon() {
    return ShoppingCartSrc;
  }

  get defaultCoverImage() {
    return FoodStoreSrc;
  }

  get title() {
    const {
      place: {
        name
      } = {}
    } = this.props;
    return `Cửa Hàng ❝${name || 'Chưa Đặt Tên'}❞`;
  }
}
