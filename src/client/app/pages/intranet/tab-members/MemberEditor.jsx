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
import Tabs from '../../../components/tabs/Tabs';
import TabHeader from '../../../components/tabs/TabHeader';
import Tab from '../../../components/tabs/Tab';
import TabBody from '../../../components/tabs/TabBody';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCreateMark = this.handleCreateMark.bind(this);

    this.isEditingTarget = props.isViewTarget || false;
    this.state = {
      isOpen: false
    };

    UserService.useUserState(this);
  }

  toggle() {
    UISounds.open();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    const { member } = this.props;
    const spotlightKey = this.isEditingTarget ? 'target' : 'spotlight';

    if (member && member.spotlight) {
      member[spotlightKey][name] = value;
      this.forceUpdate(() => {
        this.dispatchEvent({ typez: 'change', target: { name, value } });
      });
    }
  }

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const { member } = this.props;
    this.submit((event && event.currentTarget.action) || ApiEndpoints.characteristics(member._id));
  }

  submit(endpoint) {
    const { isOpen, user, ...spotlight } = this.state;
    const { member } = this.props;
    const spotlightKey = this.isEditingTarget ? 'target' : 'spotlight';
    const body = { ...(member[spotlightKey] || {}), ...(spotlight || {}) };
    superrequest.agentPost(endpoint, body)
      .then(() => {
        this.toggle();
        this.dispatchEvent({ typez: 'submit' }, body);
      });
  }

  handleCreateMark() {
    const { member } = this.props;
    const body = { ...(member.spotlight || {}) };
    superrequest.agentPost(ApiEndpoints.createMark(member._id), body)
      .then((res) => {
        this.toggle();
        this.dispatchEvent({ typez: 'create mark' }, res.data);
      });
  }

  handleTabChange(event, tabIndex) {
    if (tabIndex === 1) {
      this.isEditingTarget = true;
      this.dispatchEvent({ typez: 'view target' }, this.props.member);
    } else if (tabIndex === 0) {
      this.isEditingTarget = false;
      this.dispatchEvent({ typez: 'view present' }, this.props.member);
    }
  }

  renderEditTable(member, isTarget = false) {
    const readOnly = !UserService.isOwnerOrModOrAdmin(member._id);
    const spotlightKey = isTarget ? 'target' : 'spotlight';

    function getInputId(key) {
      return isTarget ? `target-${key}` : key;
    }

    function getLabel(label, key) {
      const isEqual = +member.target[key] === +member.spotlight[key];
      const isUp = +member.target[key] > +member.spotlight[key];
      const targetLabel = !isEqual
        ? `${label} (${isUp ? '⬆' : '⬇'}${member.target[key]})`
        : label;
      const currentLabel = !isEqual
        ? `${label} (${isUp ? '+' : '-'}${member.target[key] - member.spotlight[key]})`
        : label;
      return isTarget
        ? currentLabel
        : targetLabel;
    }

    return (
      <form
        className="member-editor__form p-3"
        action={isTarget
          ? ApiEndpoints.targetCharacteristics(member._id)
          : ApiEndpoints.characteristics(member._id)}
        onSubmit={this.handleSubmit}
      >
        <Row className="mx-0">
          {Object.entries(MembersChartHelper.Characteristics).map(([key, text]) => (
            <Col xs="12" sm="6" md="4" lg="4" key={key} className="px-1">
              <MDBInput
                label={getLabel(_.startCase(key), key)}
                title={text}
                id={getInputId(key)}
                type="number"
                min="0"
                step="1"
                name={key}
                value={member && member[spotlightKey] && member[spotlightKey][key]}
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
              className={`d-inline-block px-3 py-2 align-self-center ${isTarget ? 'peach-gradient' : ''}`}
            >{isTarget ? 'Lưu Mục Tiêu' : 'Lưu Thay Đổi'}
            </MDBBtn>
          )}
        </Row>
        <Row className="mx-0">
          <Col className="px-1 text-center">
            <MDBBtn
              className="peach-gradient"
              onClick={this.handleCreateMark}
            >Đánh Dấu Mốc Thay Đổi
            </MDBBtn>
          </Col>
        </Row>
      </form>
    );
  }

  render() {
    const { member } = this.props;
    if (!member) {
      return null;
    }
    const { isOpen } = this.state;

    return (
      <div className="member-editor">
        <div className="text-center mb-4">
          <div className="member-editor__info" onClick={this.toggle}>
            <div className="member-editor__name">{member.name}</div>
            <div className="member-editor__badges"><MemberBadge badges={member.badges} /></div>
          </div>
        </div>
        <MDBCollapse isOpen={isOpen}>
          <Tabs onChange={this.handleTabChange} tabIndex={this.isEditingTarget ? 1 : 0}>
            <Tab>
              <TabHeader>Hiện Tại</TabHeader>
              <TabBody>{this.renderEditTable(member)}</TabBody>
            </Tab>
            <Tab>
              <TabHeader>Mục Tiêu</TabHeader>
              <TabBody>{this.renderEditTable(member, true)}</TabBody>
            </Tab>
          </Tabs>
        </MDBCollapse>
      </div>
    );
  }
}
