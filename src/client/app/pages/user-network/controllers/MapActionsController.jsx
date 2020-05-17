import BaseMapController from './BaseMapController';
import UserService from '../../../services/user/UserService';
import t from '../../../languages';
import MapService from '../../../services/map/MapService';
import MapUtils from '../../../utils/MapUtils';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';
import { bindMethods } from '../../../utils';


export default class extends BaseMapController {
  static init(userNetwork) {
    super.init(userNetwork);
    bindMethods(this,
      this.handleMoveMarker, this.handleContextActions,
      this.handleLeftToolbarAction, this.handleRightToolbarAction);
  }

  static handleMoveMarker(markerProps, map, event, place) {
    if (!window.confirm('Xác nhận di chuyển địa điểm này?')) {
      place.ref.moveTo();
      event.stop();
      return;
    }
    place.position = event.latLng.toJSON();
    const { _id, position } = place;
    MapService.update({ _id, position });
  }

  static handleContextActions(event, option, newPlace) {
    // const { ContextOptions } = MapContextMenu;
    if (newPlace) {
      return this.createNewPlace(newPlace);
    }
    return null;
  }

  static createNewPlace(newPlace) {
    if (!newPlace) {
      return null;
    }
    if (!UserService.isLoggedIn) {
      return AnyDialogHelper.openLogin(t('components.loginDialog.loginToRiseYourVoice'));
    }
    const newMarker = {
      ...newPlace,
      marker: MapUtils.getMarkerByType(newPlace.__t)
    };
    this.addMarker(newMarker);
    return MapService.create(newPlace)
      .then((res) => {
        if (!res || !res.data) {
          // rollback
        }
        Object.assign(newMarker, res.data);
        this.userNetwork.refresh();
      });
  }

  static handleLeftToolbarAction(event) {
    const { name/* , value, checked */ } = event.currentTarget;
    switch (name) {
    case 'Activist':
      break;
    case 'Strike':
      break;
    case 'Extinction':
      break;
    case 'Disaster':
      break;
    case 'Pollution':
      break;
    case 'Community':
      break;
    default:
      break;
    }
    console.log(event);
  }

  // eslint-disable-next-line class-methods-use-this
  static handleRightToolbarAction(event, place) {
    this.userNetwork.closeAll();
    if (place.zoom) {
      place.ref.zoomTo();
    } else {
      place.ref.open();
    }
    this.userNetwork.mapRef.current.refs.map.focus();
  }
}
