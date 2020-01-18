import React from 'react';
import classnames from 'classnames';
import BaseComponent from '../../BaseComponent';
import './ItemList.scss';
import { groupBy } from '../../../utils';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default class extends BaseComponent {
  // eslint-disable-next-line class-methods-use-this
  get groupKey() {
    return this.props.groupKey || 'post._id';
  }

  get items() {
    return this.props.items || [];
  }

  getItemLabel(item) {
    return (this.props.labelProvider && this.props.labelProvider(item)) || item.name;
  }

  findItemById(id) {
    return this.items.find(item => item._id === id);
  }

  constructor(props) {
    super(props);
    this.bind(this.handleItemClicked);
    this.state = {
      isOpen: true
    };
  }

  handleItemClicked(event) {
    const { currentTarget: { id } } = event;
    const item = this.findItemById(id);
    this.dispatchEvent(this.Events.select, item);
  }

  renderItemGroup(items) {
    const { length } = items;
    return this.renderItem(items[0], (
      <div className="item-list__item__group">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="item-list__item__group__index"
            tabIndex="-1"
            id={item._id}
            onClick={this.handleItemClicked}
            title={TimeAgo.fromNowDetailLn(item.createdAt)}
          >{length - index}
          </div>
        ))}
      </div>
    ));
  }

  renderItem(item, extraContent = null) {
    return (
      <div
        key={item._id}
        className="item-list__item"
        tabIndex="-1"
      >
        <div
          className="item-list__link"
          tabIndex="-1"
          id={item._id}
          onClick={this.handleItemClicked}
        >
          {this.getItemLabel(item)}
        </div>
        <sup><TimeAgo time={item.createdAt} className="text-light" /></sup>
        {extraContent}
      </div>
    );
  }

  render() {
    const { items } = this;
    const { row, className } = this.props;
    let groupedItems;
    if (items) {
      groupedItems = groupBy(items, this.groupKey);
    }
    if (!groupedItems) {
      return null;
    }
    return (
      <div className={classnames(
        'item-list d-flex flex-fill p-2',
        className,
        row ? 'flex-wrap' : 'flex-column'
      )}
      >
        {Object.values(groupedItems).map(groupedItem => (
          groupedItem.length === 1
            ? this.renderItem(groupedItem[0])
            : this.renderItemGroup(groupedItem)
        ))}
      </div>
    );
  }
}
