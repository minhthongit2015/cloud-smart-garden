// import React from 'react';
import FeatureSelect from './FeaturesSelect';


export default class extends FeatureSelect {
  get items() {
    const { labels = [] } = this.props.editingTarget || {};
    return labels;
  }
}
