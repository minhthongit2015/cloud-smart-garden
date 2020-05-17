/* eslint-disable class-methods-use-this */
import React from 'react';
import { MarkerTypes } from '../../../utils/Constants';
import ShoppingCartPanel from '../../../components/map-tools/floating-panel/ShoppingCartPanel';
import Random from '../../../utils/Random';


const defaultName = 'Chưa Đặt Tên';

export default class extends ShoppingCartPanel {
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

  constructor(props) {
    super(props);
    const superState = this.state || super.state;
    this.state = {
      ...superState,
      items: []
    };
  }

  addItem(item, place) {
    const existedItem = this.state.items.find(itemI => itemI._id === item._id);
    if (!existedItem) {
      const sameShopItem = this.state.items.find(itemI => itemI.place._id === place._id);
      const _15mins = 15 * 60000;
      const _1day = 86400000;
      const timeToDeliver = (sameShopItem && sameShopItem.timeToDeliver)
        || Date.now() + Random.int(_15mins, _1day);
      const newItem = { ...item, timeToDeliver, place };
      this.setState(prevState => ({
        items: [newItem, ...prevState.items]
      }));
    } else {
      existedItem.quantity = (existedItem.quantity || 1) + 1;
      this.forceUpdate();
    }
  }
}
