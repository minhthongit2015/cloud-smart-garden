/* eslint-disable class-methods-use-this */
import React from 'react';
import { IconBasket } from '../../../../assets/icons';
import FloatingListPanel from './FloatingListPanel';
import ShoppingCartList from '../../utils/item-list/ShoppingCartList';


export default class ShoppingCartPanel extends FloatingListPanel {
  get title() {
    return 'Giỏ hàng';
  }

  get titleColor() {
    return '#ff7e7e';
  }

  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || 'calc(100% - 84px)';
  }

  get size() {
    return this.props.size || '40px';
  }

  get right() {
    return this.props.right || '10px';
  }

  get top() {
    return this.props.top || '60px';
  }

  get toggleIcon() {
    return <IconBasket />;
  }

  renderContent() {
    const { onSelect } = this.props;
    const { items } = this.state;
    return (
      <ShoppingCartList
        className="p-2"
        items={items}
        onSelect={onSelect}
        row={this.isRow}
      />
    );
  }
}
