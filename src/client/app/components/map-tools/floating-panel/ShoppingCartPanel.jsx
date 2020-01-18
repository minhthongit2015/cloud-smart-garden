/* eslint-disable class-methods-use-this */
import React from 'react';
import FloatingPanel from './FloatingPanel';
import { IconShoppingCart } from '../../../../assets/icons';


export default class ShoppingCartPanel extends FloatingPanel {
  get title() {
    return 'Giỏ hàng';
  }

  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || 'calc(100% - 34px)';
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

  get isRow() { return (this.props.row != null && this.props.row) || true; }

  get toggleIcon() {
    return <IconShoppingCart />;
  }
}
