import React from 'react';
import RightClickContextMenu from '../../../components/map-tools/right-click-context-menu/RightClickContextMenu';
import UserService from '../../../services/user/UserService';
// import MapService from '../../services/MapService';
import BaseComponent from '../../../components/BaseComponent';
import { MarkerTypes } from '../../../utils/Constants';

const ContextOptions = {
  addPlace: { label: '+ Địa điểm mới', value: `add-${MarkerTypes.place}` },
  addExpert: { label: '+ Chuyên gia cây trồng', value: `add-${MarkerTypes.expert}` },
  addMyGarden: { label: '+ Đánh dấu vườn của tôi', value: `add-${MarkerTypes.garden}` },
  addGarden: { label: '+ Vườn gia đình', value: `add-${MarkerTypes.garden}` },
  addFarm: { label: '+ Nông trại xanh', value: `add-${MarkerTypes.farm}` },
  addFoodStore: { label: '+ Cửa hàng rau củ', value: `add-${MarkerTypes.foodStore}` },
  addToolStore: { label: '+ Cửa hàng vật dụng', value: `add-${MarkerTypes.toolStore}` },
  addCharityRestaurant: { label: '+ Quán ăn từ thiện', value: `add-${MarkerTypes.charityRestaurant}` },
  addVegetarianRestaurant: { label: '+ Quán ăn chay', value: `add-${MarkerTypes.vegetarianRestaurant}` }
};

const ownerCtxOptions = [
  ContextOptions.addGarden,
  ContextOptions.addFarm,
  ContextOptions.addFoodStore,
  ContextOptions.addToolStore,
  ContextOptions.addCharityRestaurant,
  ContextOptions.addExpert
  // ContextOptions.addVegetarianRestaurant
];
const adminCtxOptions = [
  ...ownerCtxOptions
];
const moderatorCtxOptions = [
  ...ownerCtxOptions
];
const normalUserCtxOptions = [
  ContextOptions.addMyGarden
];
const noLoginCtxOptions = [
  ContextOptions.addMyGarden
];

function getContextOptions() {
  let options = [];
  if (UserService.isAdmin) {
    options = adminCtxOptions;
  } else if (UserService.isModerator) {
    options = moderatorCtxOptions;
  } else if (UserService.isNormalUser) {
    options = normalUserCtxOptions;
  } else {
    options = noLoginCtxOptions;
  }
  return options;
}

export default class extends BaseComponent.Pure {
  static get ContextOptions() {
    return ContextOptions;
  }

  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.bind(this.handleContextActions);
    UserService.useUserState(this);
  }

  handleContextActions(event, option, data) {
    let newPlace;
    if (option.value.match(/add-(.+)/)) {
      newPlace = {
        __t: option.value.match(/add-(.+)/)[1],
        name: '',
        position: data
      };
    }
    this.dispatchEvent(event, option, newPlace);
  }

  open(...args) {
    this.menuRef.current.open(...args);
  }

  render() {
    return (
      <RightClickContextMenu
        ref={this.menuRef}
        options={getContextOptions()}
        onSelect={this.handleContextActions}
      />
    );
  }
}
