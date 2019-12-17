import React from 'react';
import MapContextMenu from '../../components/map-tools/map-context-menu/MapContextMenu';
import UserService from '../../services/UserService';
// import MapService from '../../services/MapService';
import { getAutoDispatcher } from '../../components/Helper';

const ContextOptions = {
  addDisaster: { label: '+ Thêm vùng thiên tai', value: 'add-Disaster' },
  addPollution: { label: '+ Thêm vùng ô nhiễm', value: 'add-Pollution' },
  addExtinction: { label: '+ Thêm vùng sinh vật bị nguy hiểm', value: 'add-Extinction' },
  addActivist: { label: '+ Thêm cá nhân vì môi trường (giữ Ctrl)', value: 'add-Activist' },
  addRiseMyVoice: { label: '+ Tham gia chống biến đổi khí hậu', value: 'add-Activist' },
  addActivistGroup: { label: '+ Thêm nhóm hoạt động môi trường', value: 'add-ActivistGroup' },
  addStrike: { label: '+ Thêm cuộc diễu hành', value: 'add-Strike' },
  addAction: { label: '+ Thêm hành động vì môi trường', value: 'add-Action' }
};

const ownerCtxOptions = [
  ContextOptions.addDisaster,
  ContextOptions.addPollution,
  ContextOptions.addExtinction,
  ContextOptions.addActivist,
  ContextOptions.addActivistGroup,
  ContextOptions.addStrike,
  ContextOptions.addAction
];
const adminCtxOptions = [
  ...ownerCtxOptions
];
const moderatorCtxOptions = [
  ...ownerCtxOptions
];
const normalUserCtxOptions = [
  ContextOptions.addRiseMyVoice
];
const noLoginCtxOptions = [
  ContextOptions.addRiseMyVoice
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

export default class extends React.PureComponent {
  static get ContextOptions() {
    return ContextOptions;
  }

  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.autoDispatcher = getAutoDispatcher(this);
    this.handleContextActions = this.handleContextActions.bind(this);
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
    this.autoDispatcher(event, option, newPlace);
  }

  open(...args) {
    this.menuRef.current.open(...args);
  }

  render() {
    return (
      <MapContextMenu
        ref={this.menuRef}
        options={getContextOptions()}
        handler={this.handleContextActions}
      />
    );
  }
}
