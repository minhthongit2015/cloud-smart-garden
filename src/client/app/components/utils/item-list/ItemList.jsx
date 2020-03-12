/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import StylePropType from 'react-style-proptype';
import BaseComponent from '../../_base/BaseComponent';
import './ItemList.scss';
import { groupBy } from '../../../utils';
import TimeAgo from '../time-ago/TimeAgo';
import Random from '../../../utils/Random';


export default class ItemList extends BaseComponent {
  get items() {
    return this.props.items || [];
  }

  get isRow() {
    return this.props.isRow || false;
  }

  get itemKey() {
    return this.props.itemKey || '_id';
  }

  get groupKey() {
    return this.props.groupKey || 'post._id';
  }

  get baseClass() {
    return this.props.baseClass || 'item-list';
  }

  get canAdd() {
    return this.props.canAdd;
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

  findItemByKey(itemKey) {
    return this.items.find(item => item[this.itemKey] === itemKey);
  }

  constructor(props) {
    super(props);
    this.bind(this.handleItemClick);
  }

  handleItemClick(event) {
    const { currentTarget: { id: itemKey } } = event;
    const item = this.findItemByKey(itemKey);
    this.dispatchEvent(this.Events.select, item);
  }

  renderItems() {
    const { items, groupKey } = this;
    let groupedItems;
    if (items) {
      groupedItems = groupBy(items, groupKey);
    }
    if (!groupedItems) {
      return null;
    }
    return (
      Object.values(groupedItems).map(groupedItem => (
        (groupedItem.length == null || groupedItem.length === 1)
          ? this.renderItem(groupedItem[0] || groupedItem)
          : this.renderItemGroup(groupedItem)
      ))
    );
  }

  renderItemGroup(itemsInGroup) {
    const { length } = itemsInGroup;
    return this.renderItem(itemsInGroup[0], null, (
      <div className={`${this.baseClass}__item__group`}>
        {itemsInGroup.map((item, index) => (
          <div
            key={item._id}
            className={`${this.baseClass}__item__group__index`}
            tabIndex="-1"
            id={item._id}
            onClick={this.handleItemClick}
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
        key={_id || Random.hex()}
        className={`${this.baseClass}__item d-flex`}
        tabIndex="-1"
      >
        {beforeContent}
        {this.renderBeforeItem(item)}
        {icon && <div className={`${this.baseClass}____item__icon mr-2`}>{icon}</div>}
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
          className={`${this.baseClass}__item__link`}
          tabIndex="-1"
          id={_id || Random.hex()}
          onClick={this.handleItemClick}
        >
          {this.getItemLabel(item)}
        </div>
        <sup><TimeAgo time={createdAt} className="text-light" /></sup>
      </React.Fragment>
    );
  }

  renderAddSection() {
    return <div>+ Add New Item</div>;
  }

  render() {
    const {
      className, noStyle = false, style
    } = this.props;
    const { baseClass } = this;

    return (
      <div
        className={classNames(
          { [baseClass]: !noStyle },
          'd-flex flex-fill',
          className,
          this.isRow ? 'horizontal flex-wrap' : 'vertical flex-column'
        )}
        style={style}
      >
        {this.renderItems()}
        {this.canAdd && this.renderAddSection()}
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array,

  isRow: PropTypes.bool,
  itemKey: PropTypes.string,
  groupKey: PropTypes.string,
  baseClass: PropTypes.string,
  className: PropTypes.string,
  style: StylePropType,
  noStyle: PropTypes.bool,

  labelProvider: PropTypes.func,
  iconProvider: PropTypes.func,
  itemContentProvider: PropTypes.func,

  addable: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  onSelect: PropTypes.func
};

ItemList.defaultProps = {
  items: null,
  isRow: false,
  itemKey: '',
  groupKey: '',
  baseClass: '',
  className: '',
  style: null,
  noStyle: false,

  labelProvider: null,
  iconProvider: null,
  itemContentProvider: null,

  addable: false,
  onSelect: null
};
