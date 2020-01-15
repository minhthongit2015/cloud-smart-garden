/* eslint-disable class-methods-use-this */
import RightToolBar from '../../../components/map-tools/right-toolbar/RightToolBar';


export default class extends RightToolBar {
  get groupKey() {
    return 'post._id';
  }

  get items() {
    return this.props.places || super.items;
  }

  getItemLabel(item) {
    return item.name || (item.post && item.post.title);
  }
}
