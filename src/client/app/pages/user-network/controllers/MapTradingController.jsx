import BaseComponent from '../../../components/BaseComponent';
import BaseMapController from './BaseMapController';


export default class extends BaseMapController {
  static init(userNetwork) {
    super.init(userNetwork);
    BaseComponent.bindMethods(this,
      this.handleSelectToBuy);
  }

  static handleSelectToBuy(event, item, marker) {
    this.userNetwork.shoppingCartRef.current.addItem(item, marker.place);
    this.userNetwork.shoppingCartRef.current.open();
  }
}
