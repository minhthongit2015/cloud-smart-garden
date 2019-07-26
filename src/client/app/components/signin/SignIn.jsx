import React, { Component } from 'react';
import {
  Button, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
  FormInline, MDBInput
} from 'mdbreact';

export default class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false
    };
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle = () => {
    this.setState(prevState => ({
      isShowLoginModal: !prevState.isShowLoginModal
    }));
  }

  render() {
    const { isShowLoginModal } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={this.open}
          size="sm"
        >
          Sign In
        </Button>
        <MDBModal isOpen={isShowLoginModal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>
            Sign In to Yoth Garden
          </MDBModalHeader>
          <MDBModalBody>
            <FormInline>
              <MDBInput label="Username" />
              <MDBInput label="Password" />
            </FormInline>
          </MDBModalBody>
          <MDBModalFooter>
            <Button>Sign In</Button>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}
