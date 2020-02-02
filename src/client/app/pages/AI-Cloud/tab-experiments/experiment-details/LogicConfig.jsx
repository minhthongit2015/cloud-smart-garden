/* eslint-disable class-methods-use-this */
import React from 'react';
import BaseComponent from '../../../../components/BaseComponent';
import Random from '../../../../utils/Random';
import Place from '../../../../components/map/place/Place';
import ItemList from '../../../../components/utils/item-list/ItemList';
import RawItemList from '../../../../components/utils/item-list/RawItemList';


export default class extends BaseComponent.Pure {
  renderItem(item) {
    return (
      <div>{item._id}</div>
    );
  }

  render() {
    const items = [
      { _id: Random.uuid(), name: 'Ánh sáng' },
      { _id: Random.uuid(), name: 'Số phút trong ngày' }
    ];
    return (
      <div>
        <ItemList items={items} />
        <div>+ add more</div>
      </div>
    );
  }
}
