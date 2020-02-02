/* eslint-disable class-methods-use-this */
import React from 'react';
import ItemList from './ItemList';
import { IconGiftOpen } from '../../../../assets/icons';
import TimeAgo from '../time-ago/TimeAgo';


export default class extends ItemList {
  getStoreName(item) {
    return item.store.name;
  }

  getItemIcon() {
    return <IconGiftOpen width="40px" height="40px" />;
  }

  renderItemContent(item) {
    const { _id, createdAt, place = {} } = item;
    return (
      <React.Fragment>
        <div
          className="item-list__item__link"
          tabIndex="-1"
          id={_id}
          onClick={this.handleItemClick}
        >
          {this.getItemLabel(item)}
        </div>
        <div>
          <small>Cửa hàng: {place.name}</small>
        </div>
        <div>
          <sup>Giao trong: <TimeAgo time={createdAt} className="text-light" /></sup>
        </div>
      </React.Fragment>
    );
  }
}
