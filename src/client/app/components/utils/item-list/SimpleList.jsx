import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import StylePropType from 'react-style-proptype';
import BaseComponent from '../../_base/BaseComponent';
import Random from '../../../utils/Random';
import './SimpleList.scss';


export default class SimpleList extends BaseComponent {
  get items() {
    return this.props.items || [];
  }

  get isRow() {
    return this.props.isRow || false;
  }

  get noStyle() {
    return this.props.noStyle || false;
  }

  get baseClass() {
    return this.props.baseClass || 'simple-list';
  }

  get customClass() {
    return this.props.customClass || '';
  }

  static getItemKey(item) {
    return item && (item._id || item.key);
  }

  static findItemByKey(itemKey, items = []) {
    return items.find(item => SimpleList.getItemKey(item) === itemKey);
  }

  constructor(props) {
    super(props);
    this.bind(this.handleItemClick);
  }

  handleItemClick(event) {
    const { currentTarget: { id: itemKey } } = event;
    const item = SimpleList.findItemByKey(itemKey, this.items);
    this.dispatchEvent(this.Events.select, item);
  }

  renderItems() {
    return (
      <div
        className={classNames(
          `${this.baseClass}__item-list`,
          'd-flex',
          this.isRow ? 'horizontal flex-wrap' : 'vertical flex-column'
        )}
      >
        {this.items.map(item => this.renderItem(item))}
      </div>
    );
  }

  renderItem(item) {
    const itemKey = SimpleList.getItemKey(item) || Random.hex();
    return (
      <div
        key={itemKey}
        className={`${this.baseClass}__item d-flex`}
        tabIndex="-1"
        id={itemKey}
        onClick={this.handleItemClick}
      >
        {this.getItemContent(item)}
      </div>
    );
  }

  getItemContent(item) {
    return (this.props.itemContentProvider && this.props.itemContentProvider(item))
      || this.renderItemContent(item);
  }

  renderItemContent(item) {
    return (
      <div
        className={`${this.baseClass}__item__content`}
        tabIndex="-1"
      >
        {item && item.name}
      </div>
    );
  }

  render() {
    const { className, style } = this.props;

    return (
      <div
        className={classNames(
          { [this.baseClass]: !this.noStyle },
          this.customClass,
          className,
        )}
        style={style}
      >
        {this.renderItems()}
      </div>
    );
  }
}

SimpleList.propTypes = {
  items: PropTypes.array,
  isRow: PropTypes.bool,

  baseClass: PropTypes.string,
  customClass: PropTypes.string,
  className: PropTypes.string,
  style: StylePropType,
  noStyle: PropTypes.bool,

  itemContentProvider: PropTypes.func,

  // eslint-disable-next-line react/no-unused-prop-types
  onSelect: PropTypes.func
};

SimpleList.defaultProps = {
  items: null,
  isRow: false,

  baseClass: '',
  customClass: '',
  className: '',
  style: null,
  noStyle: false,

  itemContentProvider: null,

  onSelect: null
};
