/* eslint-disable class-methods-use-this */
import React from 'react';
import FloatingPanel from '../../../components/map-tools/floating-panel/FloatingPanel';
import { MarkerTypes } from '../../../utils/Constants';
import { ShoppingCartIcon } from '../../../../../old-client/assets/icons';


const defaultName = 'Chưa Đặt Tên';

export default class extends FloatingPanel {
  get title() {
    return 'Giỏ hàng';
  }

  get size() {
    return '40px';
  }

  get right() {
    return '10px';
  }

  get top() {
    return '60px';
  }

  labelProvider(place) {
    switch (place.__t) {
    case MarkerTypes.farm:
      return <span>Nông trại ❝{place.name || defaultName}❞</span>;
    case MarkerTypes.garden:
      return <span>Vườn ❝{place.name || defaultName}❞</span>;
    case MarkerTypes.foodStore:
      return <span>Cửa hàng ❝{place.name || defaultName}❞</span>;
    case MarkerTypes.toolStore:
      return <span>Cửa hàng ❝{place.name || defaultName}❞</span>;
    case MarkerTypes.charityRestaurant:
      return <span>Quán ăn ❝{place.name || defaultName}❞</span>;
    case MarkerTypes.expert:
      return <span>Chuyên gia ❝{place.name || defaultName}❞</span>;
    default:
      return place.name || (place.post && place.post.title) || defaultName;
    }
  }

  renderIcon() {
    return <ShoppingCartIcon />;
  }
}
