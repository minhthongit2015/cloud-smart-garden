/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import '../toolbar/Toolbar.scss';
import './RightToolbar.scss';
import { IconPlus } from '../../../../assets/icons';
import BaseComponent from '../../BaseComponent';
import { groupBy } from '../../../utils';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default class extends BaseComponent.Pure {
  get groupKey() {
    return 'post._id';
  }

  get items() {
    return this.props.items || [];
  }

  getItemLabel(item) {
    return item.name;
  }

  constructor(props) {
    super(props);
    this.bind(this.toggle, this.handleItemClicked);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleItemClicked(event) {
    const { target: { id } } = event;
    const item = this.findItemById(id);
    this.dispatchEvent(this.Events.select, item);
  }

  findItemById(id) {
    return this.items.find(item => item._id === id);
  }

  renderItemGroup(items) {
    const { length } = items;
    return this.renderItem(items[0], (
      <div className="map-toolbar__list__item__group">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="map-toolbar__list__item__group__index"
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
        className="map-toolbar__list__item"
        tabIndex="-1"
      >
        <div><TimeAgo time={item.createdAt} /></div>
        <div
          className="map-toolbar__list__link"
          tabIndex="-1"
          id={item._id}
          onClick={this.handleItemClicked}
        >
          {this.getItemLabel(item)}
        </div>
        {extraContent}
      </div>
    );
  }

  renderContent() {
    const { items } = this;
    let groupedItems;
    if (items) {
      groupedItems = groupBy(items, this.groupKey);
    }
    if (!groupedItems) {
      return null;
    }
    return (
      <div className="map-toolbar__list d-flex flex-column flex-fill">
        {Object.values(groupedItems).map(groupedItem => (
          groupedItem.length === 1
            ? this.renderItem(groupedItem[0])
            : this.renderItemGroup(groupedItem)
        ))}
      </div>
    );
  }

  renderHeader() {
    const { isOpen } = this.state;
    return (
      <div className="d-flex justify-content-end align-items-center">
        {isOpen && (
          <div className="map-toolbar__title mx-2">Tin tức mới</div>
        )}
        <MDBBtn
          className="map-toolbar__toggle map-toolbar__btn"
          color="none"
          onClick={this.toggle}
          title="Tin tức mới [Tab]"
        >
          <IconPlus width="100%" height="100%" />
        </MDBBtn>
      </div>
    );
  }

  render() {
    const {
      className, handler, places, ...restProps
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={classnames(
          'map-toolbar right-toolbar',
          className,
          { open: isOpen }
        )}
        {...restProps}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
