import React from 'react';
import { MDBBtn } from 'mdbreact';
import MapService from '../../../services/map/MapService';
import UserService from '../../../services/user/UserService';
import EditPlaceDialogHelper from '../../../helpers/dialogs/EditPlaceDialogHelper';


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
      EditPlaceDialogHelper.edit(place, marker);
      // MapService.updateOrCreatePlace(place);
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
        <div className="place-actions text-center mt-2">
          <hr className="my-3" />
          <div>
            <MDBBtn
              name="edit-place"
              className="py-1 px-4 btn-default"
              onClick={this.handlePlaceActions}
              size="sm"
            >Cập nhập thông tin
            </MDBBtn>
          </div>
          <div>
            <span
              name="delete-place"
              className="link py-1 text-light hover-light-red"
              onClick={this.handlePlaceActions}
            >gỡ bỏ địa điểm này
            </span>
          </div>
        </div>
      )
    );
  }
}
