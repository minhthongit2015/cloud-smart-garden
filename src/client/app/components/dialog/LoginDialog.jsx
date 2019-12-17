import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBBtn, MDBInput,
  MDBWaves
} from 'mdbreact';
import UserService from '../../services/UserService';
import AuthService from '../../services/Auth';
import LeafLoading from '../utils/loadings/LeafLoading';
import './LoginDialog.scss';

export default class extends React.Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSigninWithFacebook = this.handleSigninWithFacebook.bind(this);

    this.state = {
      isShowLoginModal: false,
      message: '',
      email: '',
      password: '',
      cursorPos: {},
      disabled: false
    };
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

  handleClick = (e) => {
    e.stopPropagation();
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    this.setState({ cursorPos });
  };

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

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle() {
    if (this.state.disabled) {
      return;
    }
    this.setState({
      isShowLoginModal: !this.isOpen
    });
  }

  show(message) {
    this.setState({
      isShowLoginModal: true,
      message
    });
  }

  render() {
    const {
      isShowLoginModal, email, password, disabled, message
    } = this.state;

    return (
      <MDBModal
        isOpen={isShowLoginModal}
        toggle={this.toggle}
        className="login-modal"
        style={{ position: 'relative' }}
        disabled={disabled}
      >
        <div
          className="modal-header peach-gradient justify-content-center mb-3 p-4 waves-effect"
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
        >
          <h5 className="white-text font-weight-bolder m-0">❝Climate Strike Vietnam❞</h5>
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
                /> đăng nhập với Facebook
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
        <LeafLoading overlaping={disabled} text="đang đăng nhập..." />
      </MDBModal>
    );
  }
}
