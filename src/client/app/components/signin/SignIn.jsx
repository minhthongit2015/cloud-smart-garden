import React, { Component } from 'react';
import {
  MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
  FormInline, MDBInput
} from 'mdbreact';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSample } from '../../redux/actions/SampleAction';

import { apiEndpoints } from '../../utils/Constants';

class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false,
      username: 'user1',
      password: 'sunday123'
    };
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.sampleAction = this.sampleAction.bind(this);
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
    if (res.body.user) {
      localStorage.user = JSON.stringify(res.body.user);
      this.close();
    } else {
      alert('Invalid username or password');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleSignOut() {
    localStorage.removeItem('user');
  }

  sampleAction() {
    this.props.actions.fetchSample();
  }

  render() {
    console.log('render "Comps/signin/SignIn.jsx"');
    const { isShowLoginModal, username, password } = this.state;
    const user = {};

    return (
      <React.Fragment>
        <div>{ JSON.stringify(this.props.sample) }</div>
        <MDBBtn
          onClick={this.sampleAction}
          size="sm"
        >
            test
        </MDBBtn>
        {user.name
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
                Sign In
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

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchSample }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
