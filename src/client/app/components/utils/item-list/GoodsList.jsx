/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import RawItemList from './RawItemList';


export default class extends RawItemList {
  constructor(props) {
    super(props);
    this.bind(this.handleSelectItem);
  }

  handleItemClick() {
    // do nothing
  }

  handleSelectItem(event) {
    const { currentTarget: { id } } = event;
    const item = this.findItemByKey(id);
    this.dispatchEvent(this.Events.select, item);
  }

  renderAfterItem(item) {
    return (
      <MDBBtn
        className="p-1"
        size="sm"
        id={item._id}
        onClick={this.handleSelectItem}
      >miễn phí
      </MDBBtn>
    );
  }
}
