import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBBtn, MDBInput,
  MDBWaves
} from 'mdbreact';
import UserService from '../../services/user/UserService';
import AuthService from '../../services/user/Auth';
import LeafLoading from '../utils/loadings/LeafLoading';
import './LoginDialog.scss';
import BaseDialog from './BaseDialog';

export default class extends BaseDialog {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSigninWithFacebook = this.handleSigninWithFacebook.bind(this);

    this.state = {
      ...this.state,
      message: props.data,
      email: '',
      password: ''
    };
  }

  show(message) {
    this.setState({ message }, this.open);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await UserService.signIn(this.state.email, this.state.password);
    if (!res.ok) {
      return alert('Invalid email or password');
    }
    if (res.data.user) {
      this.props.actions.saveUser(res.data.user);
      return this.close();
    }
    return alert('Invalid email or password');
  }

  handleSigninWithFacebook() {
    this.setState({
      disabled: true
    }, () => {
      AuthService.fbLogin()
        .then((ok) => {
          this.setState({
            disabled: false
          });
          if (ok) {
            this.close();
          }
        });
    });
  }

  render() {
    const {
      email, password, message
    } = this.state;

    return (
      <MDBModal
        isOpen={this.isOpen}
        toggle={this.toggle}
        className="login-modal rounded"
        style={{ position: 'relative' }}
        disabled={this.disabled}
      >
        <div
          className="modal-header peach-gradient justify-content-center mb-3 p-3 waves-effect"
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
        >
          <h5 className="text-1.5 text-beauty text-white m-0">❝Beyond Garden❞</h5>
          <MDBWaves
            cursorPos={this.state.cursorPos}
          />
        </div>
        <MDBModalBody>
          <form onSubmit={this.handleSubmit} id="signin-form">
            {message && <div className="login-modal__message">{message}</div>}
            <MDBInput
              style={{ boxSizing: 'border-box' }}
              className="px-3"
              label="Email"
              name="email"
              value={email}
              required
              onChange={this.handleInputChange}
              type="email"
              error="wrong"
              success="right"
              autoComplete="email"
              // validate
            />
            <MDBInput
              style={{ boxSizing: 'border-box' }}
              className="px-3"
              label="Password"
              name="password"
              value={password}
              required
              onChange={this.handleInputChange}
              type="password"
              autoComplete="current-password"
              // validate
            />
            <div className="text-center">
              <MDBBtn
                color="none"
                className="btn-paper shadow-style mb-3 px-4 py-2"
                style={{
                  color: '#00468c',
                  fontSize: '17px'
                }}
                onClick={this.handleSigninWithFacebook}
              >
                <i
                  className="fab fa-facebook mr-2"
                /> Đăng nhập với Facebook
              </MDBBtn>
            </div>
            <div className="text-center mb-3">
              <MDBBtn
                gradient="peach"
                type="submit"
                form="signin-form"
                className="shadow-sm px-5 py-3"
              >Đăng Nhập
              </MDBBtn>
            </div>
          </form>
        </MDBModalBody>
        <LeafLoading overlaping={this.disabled} text="đang đăng nhập..." />
      </MDBModal>
    );
  }
}
