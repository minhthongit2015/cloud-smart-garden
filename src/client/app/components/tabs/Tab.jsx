import BaseComponent from '../BaseComponent';


export default class Tab extends BaseComponent.Pure {
  render() {
    return this.props.children;
  }
}
