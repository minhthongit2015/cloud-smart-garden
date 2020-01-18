/* eslint-disable class-methods-use-this */
import React from 'react';
import FloatingPanel from './FloatingPanel';
import ItemList from '../../utils/item-list/ItemList';


export default class extends FloatingPanel {
  get isRow() {
    return (this.props.row != null && this.props.row) || false;
  }

  labelProvider(item) {
    return item.name;
  }

  iconProvider() {
    return null;
  }

  renderContent() {
    const { items, onSelect } = this.props;
    return (
      <ItemList
        className="p-2"
        items={items}
        labelProvider={this.labelProvider}
        iconProvider={this.iconProvider}
        onSelect={onSelect}
        row={this.isRow}
      />
    );
  }
}
