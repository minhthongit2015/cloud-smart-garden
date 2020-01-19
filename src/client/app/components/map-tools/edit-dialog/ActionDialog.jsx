import DisasterDialog from './DisasterDialog';
import { MarkerTypes } from '../../../utils/Constants';


export default class ActionDialog extends DisasterDialog {
  static get type() { return MarkerTypes.garden; }
}
