/* eslint-disable class-methods-use-this */
import React from 'react';
import classnames from 'classnames';
import BaseComponent from '../../BaseComponent';
import './ItemList.scss';
import { groupBy } from '../../../utils';
import TimeAgo from '../time-ago/TimeAgo';


export default class ItemList extends BaseComponent {
  get groupKey() {
    return this.props.groupKey || 'post._id';
  }

  get items() {
    return this.props.items || [];
  }

  get row() {
    return this.props.row || false;
  }

  getItemLabel(item) {
    return (this.props.labelProvider && this.props.labelProvider(item)) || item.name;
  }

  getItemIcon(item) {
    return (this.props.iconProvider && this.props.iconProvider(item)) || item.icon;
  }

  getItemContent(item) {
    return (this.props.itemContentProvider && this.props.itemContentProvider(item))
      || this.renderItemContent(item);
  }

  findItemById(id) {
    return this.items.find(item => item._id === id);
  }

  constructor(props) {
    super(props);
    this.bind(this.handleClickItem);
    this.state = {
      isOpen: true
    };
  }

  handleClickItem(event) {
    const { currentTarget: { id } } = event;
    const item = this.findItemById(id);
    this.dispatchEvent(this.Events.select, item);
  }

  renderItemGroup(items) {
    const { length } = items;
    return this.renderItem(items[0], null, (
      <div className="item-list__item__group">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="item-list__item__group__index"
            tabIndex="-1"
            id={item._id}
            onClick={this.handleClickItem}
            title={TimeAgo.fromNowDetailLn(item.createdAt)}
          >{length - index}
          </div>
        ))}
      </div>
    ));
  }

  renderItem(item, beforeContent, afterContent) {
    const { _id } = item;
    const icon = this.getItemIcon(item);
    return (
      <div
        key={_id}
        className="item-list__item d-flex"
        tabIndex="-1"
      >
        {beforeContent}
        {this.renderBeforeItem(item)}
        {icon && <div className="item-list__item__icon mr-2">{icon}</div>}
        <div>
          {this.getItemContent(item)}
        </div>
        {this.renderAfterItem(item)}
        {afterContent}
      </div>
    );
  }

  renderBeforeItem() {
    return null;
  }

  renderAfterItem() {
    return null;
  }

  renderItemContent(item) {
    const { _id, createdAt } = item;
    return (
      <React.Fragment>
        <div
          className="item-list__item__link"
          tabIndex="-1"
          id={_id}
          onClick={this.handleClickItem}
        >
          {this.getItemLabel(item)}
        </div>
        <sup><TimeAgo time={createdAt} className="text-light" /></sup>
      </React.Fragment>
    );
  }

  render() {
    const { items } = this;
    const { className } = this.props;
    let groupedItems;
    if (items) {
      groupedItems = groupBy(items, this.groupKey);
    }
    if (!groupedItems) {
      return null;
    }
    return (
      <div className={classnames(
        'item-list d-flex flex-fill',
        className,
        this.row ? 'horizontal flex-wrap' : 'vertical flex-column'
      )}
      >
        {Object.values(groupedItems).map(groupedItem => (
          (groupedItem.length == null || groupedItem.length === 1)
            ? this.renderItem(groupedItem[0] || groupedItem)
            : this.renderItemGroup(groupedItem)
        ))}
      </div>
    );
  }
}
