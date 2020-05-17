/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import ItemList from './ItemList';
import { IconGiftOpen } from '../../../../assets/icons';
import TimeAgo from '../time-ago/TimeAgo';


export default class extends ItemList {
  constructor(props) {
    super(props);
    this.bind(this.handleCheckout);
  }

  handleCheckout() {
    alert('Hàng đang được giao đến cho bạn');
  }

  getStoreName(item) {
    return item.store.name;
  }

  getItemIcon() {
    return <IconGiftOpen width="40px" height="40px" />;
  }

  renderNoItem() {
    return (
      <div className="mx-1 my-2">
        Chưa có món đồ nào được chọn
      </div>
    );
  }

  renderAfterItemList() {
    return (
      <MDBBtn onClick={this.handleCheckout} className="py-2 px-1">Đặt Hàng</MDBBtn>
    );
  }

  renderItemContent(item) {
    const {
      _id, place, quantity, timeToDeliver
    } = item;
    const { order, title, ref } = place || {};

    return (
      <React.Fragment>
        <div
          className="item-list__item__link"
          id={_id}
          onClick={this.handleItemClick}
        >
          {this.getItemLabel(item)}{quantity ? ` x ${quantity}` : ''}
        </div>
        <div>
          <small>
            <span>Cửa hàng: </span>
            <span className="cursor-pointer text-gray hover-light-red" onClick={ref.toggle} id={order} name={title}>
              {title}
            </span>
          </small>
        </div>
        <div>
          <sup>Giao trong: <TimeAgo time={timeToDeliver} className="text-gray" /></sup>
        </div>
      </React.Fragment>
    );
  }
}
