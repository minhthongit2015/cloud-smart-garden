import BaseMapController from './BaseMapController';
import { bindMethods } from '../../../utils';


export default class extends BaseMapController {
  static init(userNetwork) {
    super.init(userNetwork);
    bindMethods(this, this.handleSelectToBuy);
  }

  static handleSelectToBuy(event, item, marker) {
    this.userNetwork.shoppingCartRef.current.addItem(item, marker.place);
    this.userNetwork.shoppingCartRef.current.open();
  }
}
