import BaseComponent from '../_base/BaseComponent';


export default class Tab extends BaseComponent.Pure {
  render() {
    return this.props.children;
  }
}
