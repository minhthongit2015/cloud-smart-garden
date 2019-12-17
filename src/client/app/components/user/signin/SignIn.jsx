import React, { Component } from 'react';
import {
  MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
  MDBTooltip
} from 'mdbreact';
import './SignIn.scss';

import UserService from '../../../services/UserService';
import AuthService from '../../../services/Auth';
import t from '../../../languages';
import LoginDialogService from '../../../services/LoginDialogService';
import ProgressWithIcon from '../../utils/progres-with-icon/ProgressWithIcon';
import { IconRankLeader, IconPlusPoint } from '../../../../assets/icons';
import SavedPostsDialogService from '../../../services/SavedPostsDialogService';
import IDoPostsDialogService from '../../../services/IDoPostsDialogService';


export default class SignIn extends Component {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.rankRef = React.createRef();
    this.dropdownRef = null;
    this.handleOnDropdownRef = this.handleOnDropdownRef.bind(this);
    this.state = {
      isShowLoginModal: false,
      disabled: false
    };
    UserService.useFbUserState(this);
    UserService.useFbProfileState(this);
    UserService.useUserState(this);
  }

  handleOnDropdownRef(ref) {
    this.dropdownRef = ref;
    if (!ref || (ref && ref._toggle)) {
      return;
    }
    ref._toggle = ref.toggle;
    ref.toggle = (...args) => {
      ref._toggle(...args);
      if (!ref.state.isOpen) {
        this.handleOpenMenuContext();
      } else {
        this.handleCloseMenuContext();
      }
    };
  }

  handleOpenMenuContext() {
    this.rankRef.current.setOpen(true);
  }

  handleCloseMenuContext() {
    this.rankRef.current.setOpen(false);
  }

  static handleSignOut() {
    AuthService.logout();
  }

  static open() {
    LoginDialogService.show('');
  }

  static handleContextAction(event) {
    const option = event.currentTarget.name;
    switch (option) {
    case 'dashboard':
      return window.historyz.push('/admin/dashboard');
    case 'saved-posts':
      return SavedPostsDialogService.openSavedPostsInNewHistory();
    case 'i-will-do-this':
      return IDoPostsDialogService.openIDoPostsInNewHistory();
    default:
      return null;
    }
  }

  renderAvatar() {
    const { disabled } = this.state;
    const { fbProfile, user, isAdmin } = UserService;
    const nextLevel = 100;
    const socialPoint = user
      ? user.socialPoint || 0
      : 0;

    return (
      <MDBDropdown
        dropleft
        ref={this.handleOnDropdownRef}
        className="sign-in"
      >
        <MDBDropdownToggle
          floating
          color="link"
          className="p-0 btn-paper rounded-circle shadow-style highlight-style"
          style={{ width: '35px', height: '35px' }}
        >
          <img
            alt="(^_^)!"
            src={UserService.fbAvatarSrc}
            title={fbProfile ? `Hi ${fbProfile.short_name}!` : ''}
            width="100%"
            height="100%"
            className="img-fluid z-depth-1 rounded-circle"
          />
        </MDBDropdownToggle>
        <IconPlusPoint className="sign-in__plus-point" point={socialPoint} />
        <MDBDropdownMenu basic flip>
          {user && (
            <React.Fragment>
              <MDBDropdownItem className="text-center" header>
                <ProgressWithIcon
                  ref={this.rankRef}
                  percent={user.socialPoint / nextLevel * 100}
                  icon={<IconRankLeader />}
                />
                <MDBTooltip>
                  <MDBBtn
                    className="py-0 pl-1 pr-1 m-0 text-center mt-2 text-bold"
                    size="lg"
                    color="link"
                  >{socialPoint} / {nextLevel}
                  </MDBBtn>
                  <div>
                    {!socialPoint ? (
                      <div>Bạn vẫn chưa có hoạt động nào</div>
                    ) : (
                      <div>Đây là điểm hoạt động của bạn.
                        <br />Cảm ơn bạn vì đã nỗ lực cùng thế giới chống biến đổi khí hậu!
                        <br />...những việc bạn làm sẽ giúp cứu hàng triệu sinh mạng.
                      </div>
                    )}
                  </div>
                </MDBTooltip>
                <div className="text-center text-light" />
              </MDBDropdownItem>
              <MDBDropdownItem divider />
            </React.Fragment>
          )}
          {isAdmin && (
            <MDBDropdownItem
              disabled={disabled}
              className="text-default"
              name="dashboard"
              onClick={SignIn.handleContextAction}
            >Bảng điều khiển
            </MDBDropdownItem>
          )}
          <MDBDropdownItem
            disabled={disabled}
            className="i-will-do-this"
            name="i-will-do-this"
            onClick={SignIn.handleContextAction}
          >
            <span
              role="img"
              aria-label="i-do"
              aria-labelledby="i-do"
            >✊ Điều tôi sẽ làm
            </span>
          </MDBDropdownItem>
          <MDBDropdownItem
            disabled={disabled}
            className="text-gray"
            name="saved-posts"
            onClick={SignIn.handleContextAction}
          >Bài viết đã lưu
          </MDBDropdownItem>
          <MDBDropdownItem
            disabled={disabled}
            onClick={SignIn.handleSignOut}
            className="text-gray"
          >{t('components.user.logout')}
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  render() {
    const {
      disabled
    } = this.state;
    const { fbUser } = UserService;

    return (
      <React.Fragment>
        {fbUser
          ? this.renderAvatar()
          : (
            <MDBBtn
              onClick={SignIn.open}
              size="sm"
              className="px-2 py-1 my-2 shadow-none"
              disabled={disabled}
            >
              {t('components.user.login')}
            </MDBBtn>
          )}
      </React.Fragment>
    );
  }
}
