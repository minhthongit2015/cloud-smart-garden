/* eslint-disable class-methods-use-this */
import React from 'react';
import ItemList from './ItemList';


export default class extends ItemList {
  get row() {
    return true;
  }

  renderItem(item, beforeContent, afterContent) {
    const name = this.getItemLabel(item);
    return (
      <div className="w-25 px-1 d-flex" key={item._id}>
        <div
          className="item-list__item d-flex flex-column justify-content-between text-center"
          tabIndex="-1"
        >
          {beforeContent}
          {this.renderBeforeItem(item)}
          <div
            className="item-list__item__link"
            tabIndex="-1"
            id={item._id}
            onClick={this.handleClickItem}
          >
            <div className="item-list__item__preview">
              <img src={item.picture} alt={name} />
            </div>
            <div className="item-list__item__label">
              {name}
            </div>
          </div>
          {this.renderAfterItem(item)}
          {afterContent}
        </div>
      </div>
    );
  }
}
