/* eslint-disable class-methods-use-this */
import React from 'react';
import SimpleList from '../../../../../components/utils/item-list/SimpleList';
import t from '../../../../../languages';


export default class FeatureSelect extends SimpleList {
  get items() {
    const { features = [] } = this.props.editingTarget || {};
    return features;
  }

  static getItemKey(feature) {
    return this.getNodeKey(feature[0]);
  }

  static getNodeKey(node) {
    return typeof node === 'string' ? node : node.key;
  }

  static getNodeLabel(node) {
    return typeof node === 'string'
      ? t(`features.${node.split('.').slice(-1)[0]}`)
      : node.name;
  }

  getItemContent(feature) {
    return (
      <div>
        {feature.map(node => (
          <div key={FeatureSelect.getNodeKey(node)}>
            {FeatureSelect.getNodeLabel(node)}
          </div>
        ))}
      </div>
    );
  }
}
