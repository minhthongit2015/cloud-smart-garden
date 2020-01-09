import React from 'react';
import {
  MDBInput, Row, Col, MDBCollapse, MDBBtn
} from 'mdbreact';
import _ from 'lodash';
import './MemberEditor.scss';
import BaseComponent from '../../../components/BaseComponent';
import MembersChartHelper from '../../../helpers/charts/MembersChartHelper';
import MemberBadge from '../../../../assets/badges/MemberBadge';
import UISounds from '../../../../assets/sounds/UISounds';
import superrequest from '../../../utils/superrequest';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import UserService from '../../../services/user/UserService';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isOpen: false
    };

    UserService.useUserState(this);
  }

  toggle() {
    UISounds.playMagic();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    const { member } = this.props;
    if (member && member.spotlight) {
      member.spotlight[name] = value;
      this.forceUpdate(() => {
        this.dispatchEvent({ typez: 'change', target: { name, value } });
      });
    }
  }

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const { isOpen, ...spotlight } = this.state;
    const { member } = this.props;
    const body = { ...(member.spotlight || {}), ...(spotlight || {}) };
    superrequest.agentPost(ApiEndpoints.characteristics(member._id), body)
      .then(() => {
        this.toggle();
        this.dispatchEvent({ typez: 'submit' }, body);
      });
  }

  render() {
    const { member } = this.props;
    if (!member) {
      return null;
    }
    const { isOpen } = this.state;
    const readOnly = !UserService.isOwnerOrModOrAdmin(member._id);

    return (
      <div className="member-editor">
        <div className="text-center mb-4">
          <div className="member-editor__info" onClick={this.toggle}>
            <div className="member-editor__name">{member.name}</div>
            <div className="member-editor__badges"><MemberBadge badges={member.badges} /></div>
          </div>
        </div>
        <MDBCollapse isOpen={isOpen}>
          <form className="member-editor__form p-3" onSubmit={this.handleSubmit}>
            <Row>
              {Object.entries(MembersChartHelper.Characteristics).map(([key, text]) => (
                <Col lg="3" key={key}>
                  <MDBInput
                    label={_.startCase(key)}
                    title={text}
                    id={key}
                    type="number"
                    min="0"
                    step="1"
                    name={key}
                    value={member && member.spotlight && member.spotlight[key]}
                    onChange={this.handleInputChange}
                    readOnly={readOnly}
                  />
                </Col>
              ))}
              {readOnly ? (
                <MDBBtn
                  className="d-inline-block px-3 py-2 align-self-center"
                  onClick={this.toggle}
                >Ẩn chi tiết
                </MDBBtn>
              ) : (
                <MDBBtn
                  type="submit"
                  className="d-inline-block px-3 py-2 align-self-center"
                >Lưu Thay Đổi
                </MDBBtn>
              )}
            </Row>
          </form>
        </MDBCollapse>
      </div>
    );
  }
}
