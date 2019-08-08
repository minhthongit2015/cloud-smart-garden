import React, { Component } from 'react';
import {
  MDBModal, MDBModalBody,
  MDBBtn, MDBInput,
  MDBWaves
} from 'mdbreact';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearUser, saveUser } from '../../redux/actions/user-actions/UserAction';
import './SignIn.scss';

import { apiEndpoints } from '../../utils/Constants';


class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false,
      username: 'thongtran',
      password: 'alphateam',
      cursorPos: {}
    };
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.props.actions.fetchUser();
  }

  handleClick = (e) => {
    e.stopPropagation();
    console.log(e);
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    this.setState({ cursorPos });
  };

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle = () => {
    this.setState({
      isShowLoginModal: !this.isOpen
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await superagent.post(apiEndpoints.user.SIGN_IN).withCredentials()
      .send({
        username: this.state.username,
        password: this.state.password
      });
    if (!res.body.result) {
      return alert('Invalid username or password');
    }
    if (res.body.data.user) {
      this.props.actions.saveUser(res.body.data.user);
      return this.close();
    }
    return alert('Invalid username or password');
  }

  // eslint-disable-next-line class-methods-use-this
  handleSignOut() {
    this.props.actions.clearUser();
  }

  render() {
    console.log('render "Comps/signin/SignIn.jsx"');
    const { isShowLoginModal, username, password } = this.state;
    const { user } = this.props.data;

    return (
      <React.Fragment>
        <div>{ user ? user.name : '' }</div>
        {user && user.name
          ? (
            <MDBBtn
              onClick={this.handleSignOut}
              size="sm"
            >
              Sign Out
            </MDBBtn>
          )
          : (
            <MDBBtn
              onClick={this.open}
              size="sm"
            >
              ❝Sign In❞
            </MDBBtn>
          )}
        <MDBModal
          isOpen={isShowLoginModal}
          toggle={this.toggle}
          className="login-modal"
          style={{ position: 'relative' }}
        >
          <div
            className="modal-header peach-gradient justify-content-center mb-3 p-4 waves-effect"
            onMouseDown={this.handleClick}
            onTouchStart={this.handleClick}
          >
            <h5 className="white-text font-weight-bolder m-0">Sign In to ❝Yoth Garden❞</h5>
            <MDBWaves
              cursorPos={this.state.cursorPos}
            />
          </div>
          <MDBModalBody>
            <form onSubmit={this.handleSubmit} id="signin-form">
              <MDBInput
                style={{ boxSizing: 'border-box' }}
                className="px-3"
                label="Username"
                name="username"
                value={username}
                required
                onChange={this.handleInputChange}
                type="text"
                validate
                error="wrong"
                success="right"
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
                validate
              />
              <div className="text-center mb-3">
                <MDBBtn gradient="peach" type="submit" form="signin-form">Sign In</MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ data: state });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchUser, clearUser, saveUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
