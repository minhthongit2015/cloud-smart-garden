import React from 'react';
import { MDBBtn } from 'mdbreact';
import MapService from '../../../services/map/MapService';
import UserService from '../../../services/user/UserService';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';


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
      MapService.delete(place._id);
      marker.remove();
      break;
    case 'edit-place':
      AnyDialogHelper.editPlace(place, marker);
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
            ><i className="fas fa-pencil-alt" /> Cập nhập thông tin
            </MDBBtn>
          </div>
          <div>
            <span
              name="delete-place"
              className="link py-1 text-light hover-light-red"
              onClick={this.handlePlaceActions}
            ><i className="fas fa-times" /> gỡ bỏ địa điểm này
            </span>
          </div>
        </div>
      )
    );
  }
}
