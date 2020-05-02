/* eslint-disable class-methods-use-this */
import React from 'react';
import PageMarker from './PageMarker';
import { FoodStoreSrc } from '../../../../assets/icons';
import { FoodStoreImgSrc } from '../../../../assets/images';
import Section from '../../../layouts/base/section/Section';
import demogoods from './demogoods';
import './StoreMarker.scss';
import GoodsList from '../../utils/item-list/GoodsList';


export default class StoreMarker extends PageMarker {
  get customClass() {
    return 'store';
  }

  get markerIcon() {
    return FoodStoreSrc;
  }

  get defaultCoverImage() {
    return FoodStoreImgSrc;
  }

  get placeTypeTitle() {
    return 'cửa hàng';
  }

  get title() {
    const { place: { title, createdBy: { name } = {} } = {} } = this.props;
    return (
      `❝${title || name || 'Chưa Đặt Tên'}❞`
    );
  }

  constructor(props) {
    super(props);
    this.bind(this.handleSelectItem);
  }

  handleSelectItem(event, item) {
    this.dispatchEvent(event, item, this);
  }

  getGoods() {
    const { place: { goods } = {} } = this.props;
    return demogoods || goods;
  }

  getRecentBuy() {
    const recentlyBuy = this.getGoods().slice(-4);
    return recentlyBuy;
  }

  renderBody() {
    const { place: { content } = {} } = this.props;
    return (
      <React.Fragment>
        {content && (
          <div className="text-light-gray text-center text-pre mb-4">
            <i>{content}</i>
          </div>
        )}
        <Section title="mua gần đây" beautyFont>
          <GoodsList items={this.getRecentBuy()} onSelect={this.handleSelectItem} />
        </Section>
        <Section title="danh mục sản phẩm" beautyFont>
          <GoodsList items={this.getGoods()} onSelect={this.handleSelectItem} />
        </Section>
      </React.Fragment>
    );
  }
}
