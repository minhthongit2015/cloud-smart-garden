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
import ButtonBar from '../../dialog/ButtonBar';
import UserService from '../../../services/user/UserService';
import LoginDialogHelper from '../../../helpers/dialogs/LoginDialogHelper';
import MessageDialogHelper from '../../../helpers/dialogs/MessageDialogHelper';
import { IconCommunity, IconThanks } from '../../../../assets/icons';
import t from '../../../languages';
import { isZeroVariable, zeroVariable } from '../../../utils';
import superrequest from '../../../utils/superrequest';
import CategoryService from '../../../services/blog/CategoryService';
import BasePureComponent from '../../BasePureComponent';
import GlobalState from '../../../utils/GlobalState';


const scrollToTop = () => {
  const scrollBox = document.getElementById('sidebar-layout__content');
  scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
};


export default class extends BasePureComponent {
  get createTitle() {
    return 'Viết bài mới';
  }

  get updateTitle() {
    return 'Chỉnh sửa bài viết';
  }

  get postingMessage() {
    return 'đang đăng bài...';
  }

  get preventLeaveMessage() {
    return 'Bài viết của bạn vẫn chưa được lưu! Bạn có chắc muốn rời đi?';
  }

  get postButtonLabel() {
    return 'Đăng bài';
  }

  get updateButtonLabel() {
    return 'Cập nhập bài viết';
  }

  get action() {
    return '';
  }

  get postType() {
    return this.props.type || 'Post';
  }

  get formData() {
    const { disabled, expanded, ...formData } = this.state;
    delete formData[CategoryService.CATEGORIES_STATE_NAME];
    const isDraft = document.activeElement.value === 'draft';
    if (isDraft) {
      formData.status = 'draft';
    }
    formData.__t = this.postType;
    return formData;
  }

  get isEmpty() {
    try {
      const { formData } = this;
      const savedState = GlobalState.saveState(formData, ['__t', 'status']);
      delete formData.__t;
      delete formData.status;
      const isEmpty = Object.values(formData).every(value => isZeroVariable(value));
      GlobalState.restoreFromSavedState(formData, savedState);
      return isEmpty;
    } catch (error) {
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      disabled: false,
      expanded: false
    };
  }

  componentDidUpdate = () => {
    window.onbeforeunload = !this.isEmpty
      ? () => true
      : undefined;
  }

  toggleExpand() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        expanded: !prevState.expanded
      }), resolve);
    });
  }

  toggleState(state) {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        disabled: state != null ? state : prevState.disabled
      }), resolve);
    });
  }

  disable() {
    return this.toggleState(true);
  }

  enable() {
    return this.toggleState(false);
  }

  reset(extraStates = {}) {
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

  close() {
    return new Promise((resolve) => {
      this.setState({
        expanded: false
      }, resolve);
    });
  }

  resetAndClose() {
    return this.reset({ expanded: false });
  }

  sayThanks() {
    this.disable().then(() => {
      this.thankForYourPostRef.current.sayThanks();
    });
  }

  setFormData(formData) {
    return new Promise((resolve) => {
      this.setState({
        expanded: true
      }, () => {
        this.setState({
          ...formData
        });
        // wait for the form to be shown up before we set input for `react-select`
        setTimeout(() => {
          scrollToTop();
          resolve();
        }, 300);
      });
    });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  async _handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const postResult = await this.handleFormSubmit(event);
    event.typez = 'postPosted';
    this.dispatchEvent(event, postResult);
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

  async handleFormSubmit(event) {
    return new Promise(async (resolve) => {
      const isValid = await this.validate();
      if (!isValid) return;
      this.sayThanks();

      const action = this.props.action || this.action;
      superrequest.agentPost(action, this.formData)
        .then((res) => {
          if (!res || !res.ok) {
            this.handleSubmitError(res && res.error);
          }
          resolve(res.data);
          this.resetAndClose();
        })
        .catch((error) => {
          this.handleSubmitError(error);
          alert(`Xảy ra lỗi trong quá trình đăng bài! Xin vui lòng thử lại!\r\nChi tiết: "${error.code} - ${error.message}"`);
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
      LoginDialogHelper.show(t('components.loginDialog.loginToPost'));
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
    const { _id, disabled, expanded } = this.state;

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
          <form onSubmit={this._handleSubmit}>
            {this.renderBody()}
            <Row>
              <Col className="text-right">
                {this.renderButtons()}
              </Col>
            </Row>
          </form>
        </MDBCardBody>
        <LeafLoading text={this.postingMessage} overlaping={disabled} />
      </MDBCard>
    );
  }

  renderWithRow() {
    return (
      <Row>
        <Col size={12} className="d-flex justify-content-end">
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
