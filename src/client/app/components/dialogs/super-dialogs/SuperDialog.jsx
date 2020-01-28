/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter
} from 'mdbreact';
import './SuperDialog.scss';
import PageDialog from '../PageDialog';


export default class SuperDialog extends PageDialog {
  renderToggle() {
    return (
      <div onClick={this.toggle}>X</div>
    );
  }

  render() {
    if (this.isReallyClosed) return null;

    return (
      <MDBModal
        className="super-dialog__backdrop"
        isOpen={this.isOpen}
        toggle={this.toggle}
        style={{ position: 'relative' }}
      >
        <MDBModalHeader className="super-dialog__header" toggle={this.toggle}>
          {this.renderHeader()}
        </MDBModalHeader>
        <MDBModalBody className="super-dialog__body">
          {this.renderBody()}
        </MDBModalBody>
        <MDBModalFooter className="super-dialog__footer">
          {this.renderFooter()}
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
