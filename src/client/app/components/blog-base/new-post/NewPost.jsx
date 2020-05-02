/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Prompt } from 'react-router-dom';
import {
  MDBCard, MDBCardHeader, MDBCardBody,
  Button,
  Row, Col
} from 'mdbreact';
import classnames from 'classnames';
import './NewPost.scss';

import LeafLoading from '../../utils/loadings/LeafLoading';
import ButtonBar from '../../dialogs/ButtonBar';
import UserService from '../../../services/user/UserService';
import { IconThanks } from '../../../../assets/icons';
import t from '../../../languages';
import { isZeroVariable, zeroVariable } from '../../../utils';
import BaseComponent from '../../_base/BaseComponent';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';
import MessageDialogHelper from '../../../helpers/dialogs/MessageDialogHelper';
import { ModelName } from '../../../utils/Constants';
import PostService from '../../../services/blog/PostService';


const scrollToTop = () => {
  const scrollBox = document.getElementById('sidebar-layout__content');
  const newForm = document.getElementsByClassName('new-form')[0].parentNode;
  scrollBox.scrollTo({ top: newForm.offsetTop - 50, behavior: 'smooth' });
};


export default class extends BaseComponent.Pure {
  get createTitle() {
    return t('components.blogBase.newForm.createTitle');
  }

  get updateTitle() {
    return t('components.blogBase.newForm.updateTitle');
  }

  get postingMessage() {
    return t('components.blogBase.newForm.postMessage');
  }

  get preventLeaveMessage() {
    return t('components.blogBase.newForm.preventLeaveMessage');
  }

  get postButtonLabel() {
    return t('components.blogBase.newForm.postButton');
  }

  get updateButtonLabel() {
    return t('components.blogBase.newForm.updateButton');
  }

  get service() {
    return this.props.service || PostService;
  }

  get model() {
    return this.props.model || this.service.model;
  }

  get formData() {
    const { disabled, expanded, ...formData } = this.state;
    const isDraft = document.activeElement && document.activeElement.value === 'draft';
    if (isDraft) {
      formData.status = 'draft';
    }
    formData.__t = this.postType;
    return formData;
  }

  get excludeKeys() {
    return ['status', '__t'];
  }

  get isEmpty() {
    try {
      const { formData, excludeKeys } = this;
      return Object.entries(formData || {})
        .every(([key, value]) => excludeKeys.includes(key) || isZeroVariable(value));
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  get isUpdate() {
    return this.state._id != null;
  }

  constructor(props) {
    super(props);
    this.thankForYourPostRef = React.createRef();
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      disabled: false,
      expanded: false
    };
  }

  componentDidUpdate() {
    window.onbeforeunload = !this.isEmpty
      ? () => true
      : undefined;
  }

  async toggleExpand() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        expanded: !prevState.expanded
      }), resolve);
    });
  }

  async toggleState(state) {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        disabled: state != null ? state : !prevState.disabled
      }), resolve);
    });
  }

  async disable() {
    return this.toggleState(true);
  }

  async enable() {
    return this.toggleState(false);
  }

  async reset(extraStates = {}) {
    return new Promise((resolve) => {
      const formData = { ...this.formData };
      Object.entries(formData).forEach(([key, value]) => {
        formData[key] = zeroVariable(value);
      });
      this.setState({
        ...formData,
        ...extraStates,
        _id: null
      }, resolve);
    });
  }

  async close() {
    return new Promise((resolve) => {
      this.setState({
        expanded: false
      }, resolve);
    });
  }

  async resetAndClose() {
    return this.reset({ expanded: false });
  }

  async sayThanks() {
    this.disable().then(() => {
      this.thankForYourPostRef.current.sayThanks();
    });
  }

  async setFormData(formData) {
    return new Promise((resolve) => {
      this.setState({
        expanded: true
      }, () => {
        this.setState({
          ...formData
        });
        // wait for the form to be shown up before we set input for `react-select` (render issue)
        setTimeout(() => {
          scrollToTop();
          resolve();
        }, 300);
      });
    });
  }

  async _handleSubmit(event) {
    this.stopEvent(event);
    this.dispatchEvent(this.Events.submit);
    const submitResult = await this.handleFormSubmit(event);
    this.dispatchEvent(this.Events.submited, submitResult);
  }

  async validate() {
    return true;
  }

  async beforeSubmit() {
    return true;
  }

  async afterSubmit() {
    return true;
  }

  handleSubmitError(error) {
    return true;
  }

  handleFormSubmit(event) {
    return new Promise(async (resolve) => {
      const isValid = await this.validate();
      if (!isValid) return;
      this.sayThanks();

      this.service.create(this.formData, { model: this.model })
        .catch((error) => {
          this.handleSubmitError(error);
          alert(`Xảy ra lỗi trong quá trình đăng bài! Xin vui lòng thử lại!\r\nChi tiết: "${error.code} - ${error.message}"`);
        })
        .then((res) => {
          resolve(res.data);
          this.resetAndClose();
        })
        .finally(() => {
          this.enable();
        });
    });
  }

  handleButtonClick(event) {
    if (event.target.name === 'close') {
      this.reset();
    }
    if (!UserService.user) {
      AnyDialogHelper.openLogin(t('components.loginDialog.loginToPost'));
    } else if (!this.props.hasPermission) {
      this.handleMissingPermission();
    } else {
      this.toggleExpand();
    }
  }

  handleMissingPermission() {
    MessageDialogHelper.show(
      'Tham Gia Viết Bài',
      <div>
        Để tham gia cùng viết bài, bạn có thể liên hệ qua admin của <a href="https://www.facebook.com/Climate-Strike-Vietnam-101448167939446" target="_blank" rel="noopener noreferrer">Beyond Garden</a>.
      </div>
    );
  }

  renderButtons() {
    const {
      _id
    } = this.state;

    return (
      <React.Fragment>
        <Button type="button" size="sm" color="none" onClick={() => this.reset()}>Bỏ</Button>
        {/* <Button type="submit" name="submit" value="draft" size="sm" color="none">
          Lưu bản nháp</Button> */}
        <Button type="submit" size="sm">
          {!this.isUpdate ? this.postButtonLabel : this.updateButtonLabel}
          <IconThanks ref={this.thankForYourPostRef} />
        </Button>
      </React.Fragment>
    );
  }

  renderBody() {
    return null;
  }

  renderCard() {
    const { _id, disabled, expanded: expandedz } = this.state;
    const expanded = expandedz && this.props.hasPermission;

    return (
      <MDBCard className={classnames('new-form overlapable flex-fill', { disabled, expanded })}>
        <Prompt
          when={!this.isEmpty}
          message={this.preventLeaveMessage}
        />
        <MDBCardHeader className="d-flex justify-content-between py-0">
          <div className="flex-fill d-flex align-items-center">
            {this.isUpdate ? this.updateTitle : this.createTitle}
          </div>
          <ButtonBar
            onClick={this.handleButtonClick}
            closeState={expanded ? 1 : 2}
            minimizeState={expanded ? 1 : 2}
          />
        </MDBCardHeader>
        <MDBCardBody>
          {/* {expanded && ( */}
          <form onSubmit={this._handleSubmit}>
            {this.renderBody()}
            <Row>
              <Col className="text-right">
                {this.renderButtons()}
              </Col>
            </Row>
          </form>
          {/* )} */}
        </MDBCardBody>
        <LeafLoading text={this.postingMessage} overlaping={disabled} />
      </MDBCard>
    );
  }

  renderWithRow() {
    return (
      <Row>
        <Col size="12" className="d-flex justify-content-end">
          {this.renderCard()}
        </Col>
      </Row>
    );
  }

  render() {
    const { noRow = false } = this.props;
    return noRow
      ? this.renderCard()
      : this.renderWithRow();
  }
}
