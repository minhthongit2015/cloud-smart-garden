import React, { Component } from 'react';
import {
  MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
  FormInline, MDBInput
} from 'mdbreact';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearUser } from '../../redux/actions/user-actions/LoadUserAction';

import { apiEndpoints } from '../../utils/Constants';

class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false,
      username: 'thongtran',
      password: 'alphateam'
    };
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

    this.props.actions.fetchUser();
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
    const res = await superagent.post(apiEndpoints.user.SIGN_IN)
      .send({
        username: this.state.username,
        password: this.state.password
      });
    if (!res.body.result) {
      return alert('Invalid username or password');
    }
    if (res.body.data.user) {
      localStorage.user = JSON.stringify(res.body.data.user);
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
    const { user, mapEntities } = this.props.data;

    return (
      <React.Fragment>
        <div>{ user ? user.name : '' }</div>
        {mapEntities ? mapEntities.length : ''}
        {user && user.name
          ? (
            <MDBBtn
              onClick={this.handleSignOut}
              size="sm"
            >
                Sign Outzzz
            </MDBBtn>
          )
          : (
            <MDBBtn
              onClick={this.open}
              size="sm"
            >
                Sign In123
            </MDBBtn>
          )}
        <MDBModal isOpen={isShowLoginModal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>
            Sign In to Yoth Garden
          </MDBModalHeader>
          <MDBModalBody>
            <FormInline onSubmit={this.handleSubmit} id="signin-form">
              <MDBInput
                label="Username"
                name="username"
                value={username}
                required
                onChange={this.handleInputChange}
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Password"
                name="password"
                value={password}
                required
                onChange={this.handleInputChange}
                icon="lock"
                group
                type="password"
                validate
              />
            </FormInline>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary" type="submit" form="signin-form">Sign In</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   ...state
// });
const mapStateToProps = (state) => {
  console.log('map state', state);
  return { data: state };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchUser, clearUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
