/* eslint-disable class-methods-use-this */
import React from 'react';
import { MarkerTypes } from '../../../utils/Constants';
import { IconGift } from '../../../../assets/icons';
import RightFloatingPanel from '../../../components/map-tools/floating-panel/RightFloatingPanel';


const defaultName = 'Chưa Đặt Tên';

export default class extends RightFloatingPanel {
  get toggleIcon() {
    return <IconGift />;
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
}
