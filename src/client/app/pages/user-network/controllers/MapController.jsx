import BaseMapController from './BaseMapController';
import MapInteractionsController from './MapInteractionsController';
import MapActionsController from './MapActionsController';
import MapTradingController from './MapTradingController';


export default class extends BaseMapController {
  static init(userNetwork) {
    super.init(userNetwork);
    MapInteractionsController.init(userNetwork);
    MapActionsController.init(userNetwork);
    MapTradingController.init(userNetwork);
  }

  static get handleMapClick() {
    return MapInteractionsController.handleMapClick;
  }

  static get handleRightClick() {
    return MapInteractionsController.handleRightClick;
  }

  static get handleZoomChange() {
    return MapInteractionsController.handleZoomChange;
  }

  static get handleHotkeys() {
    return MapInteractionsController.handleHotkeys;
  }

  static get handleOpenMarker() {
    return MapInteractionsController.handleOpenMarker;
  }

  static get handleCloseMarker() {
    return MapInteractionsController.handleCloseMarker;
  }

  static get handleFocusMarker() {
    return MapInteractionsController.handleFocusMarker;
  }

  static get handleOpenPanel() {
    return MapInteractionsController.handleOpenPanel;
  }

  static get handleClosePanel() {
    return MapInteractionsController.handleClosePanel;
  }

  static get handleClickPanel() {
    return MapInteractionsController.handleClickPanel;
  }

  static get handleMoveMarker() {
    return MapActionsController.handleMoveMarker;
  }

  static get handleContextActions() {
    return MapActionsController.handleContextActions;
  }

  static get handleLeftToolbarAction() {
    return MapActionsController.handleLeftToolbarAction;
  }

  static get handleRightToolbarAction() {
    return MapActionsController.handleRightToolbarAction;
  }

  static get handleSelectToBuy() {
    return MapTradingController.handleSelectToBuy;
  }
}
