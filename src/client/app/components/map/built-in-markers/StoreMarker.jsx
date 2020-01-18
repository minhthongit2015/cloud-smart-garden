/* eslint-disable class-methods-use-this */
import React from 'react';
import PageMarker from './PageMarker';
import { ShoppingCartSrc } from '../../../../assets/icons';
import { FoodStoreSrc } from '../../../../assets/images';
import Section from '../../../layouts/base/section/Section';
import demogoods from './demogoods';
import './StoreMarker.scss';
import GoodsList from '../../utils/item-list/GoodsList';


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

  constructor(props) {
    super(props);
    this.bind(this.handleSelectItem);
  }

  handleSelectItem(event, item) {
    this.dispatchEvent(event, item, this);
  }

  renderBody() {
    const { place: { description, goods } = {} } = this.props;
    const recentlyBuy = (demogoods || goods).slice(-4);
    return (
      <React.Fragment>
        {description && (
          <Section>
            {description}
          </Section>
        )}
        <Section title="mua lần trước" beautyFont>
          <GoodsList items={recentlyBuy} onSelect={this.handleSelectItem} />
        </Section>
        <Section title="danh mục sản phẩm" beautyFont>
          <GoodsList items={demogoods || goods} onSelect={this.handleSelectItem} />
        </Section>
      </React.Fragment>
    );
  }
}
