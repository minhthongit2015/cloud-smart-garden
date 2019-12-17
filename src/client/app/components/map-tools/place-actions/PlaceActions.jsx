import React from 'react';
import MapService from '../../../services/MapService';
import UserService from '../../../services/UserService';
import PlaceEditDialogService from '../../../services/dialog/PlaceEditDialogService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlaceActions = this.handlePlaceActions.bind(this);
    UserService.useUserState(this);
  }

  handlePlaceActions(event) {
    const { place, marker } = this.props;
    event.currentTarget.name = event.currentTarget.getAttribute('name');
    switch (event.currentTarget.name) {
    case 'delete-place':
      if (!window.confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
        return;
      }
      MapService.deletePlace(place);
      marker.remove();
      break;
    case 'edit-place':
      PlaceEditDialogService.edit(place, marker);
      // MapService.updatePlace(place);
      break;
    default:
      break;
    }
  }

  render() {
    const { place } = this.props;
    const canEdit = UserService.isPlaceOwner(place) || UserService.isModOrAdmin;

    return (
      canEdit && (
        <div className="place-actions text-center">
          <div
            name="delete-place"
            className="btn btn-sm py-1 px-4 grey lighten-1 text-white"
            onClick={this.handlePlaceActions}
          >Xóa
          </div>
          <div
            name="edit-place"
            className="btn btn-sm py-1 px-4 btn-default"
            onClick={this.handlePlaceActions}
          >Sửa
          </div>
        </div>
      )
    );
  }
}
