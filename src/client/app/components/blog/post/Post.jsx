import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Card, CardHeader, CardBody, CardFooter, MDBCardImage,
  MDBPopover, MDBPopoverBody
} from 'mdbreact';
import classnames from 'classnames';
import './Post.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import ContextButton from '../../utils/context-button/ContextButton';
import superrequest from '../../../utils/superrequest';
import PostService from '../../../services/PostService';
// import LikeAndShare from '../../facebook/LikeAndShare';
import UserService from '../../../services/UserService';
import MessageDialogService from '../../../services/MessageDialogService';
import ShareButton from '../../facebook/ShareButton';
import LoginDialogService from '../../../services/LoginDialogService';
import Rating from '../../utils/rating/Rating';
import CategoryService from '../../../services/CategoryService';
import { IconBookmark, IconRaisedFist, IconThanks } from '../../../../assets/icons';
// eslint-disable-next-line import/no-cycle
import SavedPostsDialogService from '../../../services/SavedPostsDialogService';
// eslint-disable-next-line import/no-cycle
import IDoPostsDialogService from '../../../services/IDoPostsDialogService';
import GlobalState from '../../../utils/GlobalState';
import t from '../../../languages';
import PostDetailsDialogService from '../../../services/PostDetailsDialogService';


const ContextOptions = {
  iWillDoThis: {
    labelAdd: (
      <span role="img" className="i-will-do-this" aria-label="i-do" aria-labelledby="i-do">
        ✊ Thêm vào điều tôi sẽ làm
      </span>
    ),
    labelRemove: 'Bỏ khỏi điều tôi sẽ làm',
    value: 'i-will-do-this'
  },
  edit: { label: 'chỉnh sửa bài viết', value: 'update' },
  delete: { label: 'xóa bài viết', value: 'delete' },
  request: { label: 'đề xuất chỉnh sửa', value: 'request-update' },
  save: { label: 'lưu bài viết', value: 'save-post' }
};

const ownerCtxOptions = [
  ContextOptions.save,
  ContextOptions.edit,
  ContextOptions.delete
];
const adminCtxOptions = [
  ...ownerCtxOptions
];
const moderatorCtxOptions = [
  ...ownerCtxOptions
];
const normalUserCtxOptions = [
  ContextOptions.save,
  ContextOptions.request
];
const noLoginCtxOptions = [
  ContextOptions.request,
  ContextOptions.save
];

const whatYouCanDoCtxOptions = [
  ContextOptions.iWillDoThis
];

/**
 * 1. Admin sẽ có tất cả quyền của owner
 * 2. Moderator hiện sẽ có tất cả quyền của owner
 * 3. Owner sẽ có quyền "Sửa", "Xóa", "Lưu"
 * 4. Normal User sẽ có "Đề xuất sửa", "Lưu"
 */
function getContextOptions(post) {
  let options = [];
  if (UserService.isAdmin) {
    options = adminCtxOptions;
  } else if (UserService.isModerator) {
    options = moderatorCtxOptions;
  } else if (UserService.isPostOwner(post)) {
    options = ownerCtxOptions;
  } else if (UserService.isNormalUser) {
    options = normalUserCtxOptions;
  } else {
    options = noLoginCtxOptions;
  }
  if (CategoryService.isBelongsToCategory(post, 'WhatYouCanDo')
    || CategoryService.isBelongsToCategory(post, 'CommunityRecommend')) {
    return [...whatYouCanDoCtxOptions, ...options];
  }
  return options;
}

export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.thankForDoItRef = React.createRef();
    this.thankForSaveRef = React.createRef();
    this.togglePopup = this.togglePopup.bind(this);
    this.handlePopupChange = this.handlePopupChange.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.handleRating = this.handleRating.bind(this);

    this.state = {
      clickable: false,
      isVisible: false
    };
  }

  togglePopup() {
    const { post } = this.props;
    PostDetailsDialogService.openPostDetailsDialog(post);
  }

  handlePopupChange(state) {
    if (!state) {
      this.setState({
        clickable: false,
        isVisible: false
      });
    }
  }

  handleContextActions(event, option) {
    event.preventDefault();
    const { post } = this.props;
    switch (option) {
    case ContextOptions.request:
      if (UserService.isLoggedIn) {
        return MessageDialogService.showUpComingFeature(option.value);
      }
      return LoginDialogService.show(t('components.loginDialog.loginToRequestChange'));

    case ContextOptions.save:
      if (!UserService.isLoggedIn) {
        return LoginDialogService.show(t('components.loginDialog.loginToSavePost'));
      }
      if (post.isSaved && this.props.handleActions) {
        this.props.handleActions(event, {
          value: 'remove-saved-post'
        }, post, this);
      }
      return this.handleAddSavedPost().then(() => {
        if (!post.isSaved && this.props.handleActions) {
          this.props.handleActions(event, {
            value: 'remove-saved-post-done'
          }, post, this);
        }
      });

    case ContextOptions.iWillDoThis:
      if (!UserService.isLoggedIn) {
        return LoginDialogService.show(t('components.loginDialog.loginToSaveIDo'));
      }
      if (post.iWillDoThis && this.props.handleActions) {
        this.props.handleActions(event, {
          value: 'remove-i-do-post'
        }, post, this);
      }
      return this.handleAddIDoPost().then(() => {
        if (!post.iWillDoThis && this.props.handleActions) {
          this.props.handleActions(event, {
            value: 'remove-i-do-post-done'
          }, post, this);
        }
      });

    case ContextOptions.delete:
      if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        return null;
      }
      return superrequest.agentDelete(`/api/v1/blog/posts/${post._id}`)
        .then(() => {
          this.props.handleActions(event, { value: 'delete-done' }, post, this);
        });
    default:
      break;
    }

    if (this.props.handleActions) {
      return this.props.handleActions(event, option, post, this);
    }
    return null;
  }

  renderPreviewAsImage() {
    const { post } = this.props;
    const {
      preview = post.preview
    } = this.props;
    return (
      <div onClick={this.togglePopup}>
        <MDBCardImage
          className="img-fluid post__preview-image"
          src={preview}
        />
      </div>
    );
  }

  renderPreviewAsTitle() {
    const { post } = this.props;
    const {
      title = post.title,
      category = post.categories[0].type
    } = this.props;
    return (
      <CardHeader className={category} onClick={this.togglePopup}>{title}</CardHeader>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getSizeByClass(className) {
    switch (className) {
    case 'w1':
      return window.innerWidth * 0.1259150805270864;
    case 'w2':
      return 150;
      // return window.innerWidth * 0.29941434846266474;
    case 'w3':
      return 150;
      // return window.innerWidth;
    default:
      return window.innerWidth * 0.1259150805270864;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderSocials() {
    const { post } = this.props;
    return (
      <div className="d-flex post__sharing-facebook">
        {/* <LikeAndShare
          data-href={PostService.buildPostUrl(post)}
          data-width={this.getSizeByClass(post.previewClass)}
        /> */}
        <ShareButton url={PostService.buildPostUrl(post)} className="" />
      </div>
    );
  }

  handleRating(rating) {
    const { post } = this.props;
    if (!UserService.isLoggedIn) {
      LoginDialogService.show(t('components.loginDialog.loginToRating'));
      return;
    }

    const savedState = GlobalState.buildSavedState(
      post, ['rating', 'totalRating', 'totalVotes']
    );

    if (post.rating) {
      GlobalState.updatePoint(post, 'totalRating', -post.rating + rating);
    } else {
      GlobalState.updatePoint(post, 'totalRating', rating);
      GlobalState.updatePoint(post, 'totalVotes', 1);
      UserService.updateUserSocialPoint(1);
    }
    post.rating = rating;
    this.forceUpdate();

    superrequest.agentPost(`/api/v1/blog/rating/${post._id}`, {
      rating
    }).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
        UserService.updateUserSocialPoint(-1);
      } else {
        Object.assign(UserService.user, res.data.user);
        UserService.setUser(UserService.user);
      }
    });
  }

  handleAddSavedPost() {
    const { post } = this.props;
    const savedState = GlobalState.buildSavedState(
      post, ['isSaved', 'totalSaved']
    );

    post.isSaved = !post.isSaved;

    if (post.isSaved) {
      GlobalState.updatePoint(post, 'totalSaved', 1, this).then(() => {
        this.thankForSaveRef.current.sayThanks();
      });
      return superrequest.agentPost(`/api/v1/blog/saved-posts/${post._id}`).then((res) => {
        if (!res || !res.ok) {
          GlobalState.restoreFromSavedState(post, savedState, this);
        } else {
          // MessageDialogService.showSuccessMessage(ContextOptions.save.value, true);
        }
      });
    }

    GlobalState.updatePoint(post, 'totalSaved', -1, this);
    return superrequest.agentDelete(`/api/v1/blog/saved-posts/${post._id}`).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
      } else {
        // MessageDialogService.showSuccessMessage(ContextOptions.save.value, false);
      }
    });
  }

  handleAddIDoPost() {
    const { post } = this.props;
    const savedState = GlobalState.buildSavedState(
      post, ['iWillDoThis', 'totalIDo']
    );

    post.iWillDoThis = !post.iWillDoThis;

    if (post.iWillDoThis) {
      GlobalState.updatePoint(post, 'totalIDo', 1, this)
        .then(() => {
          this.thankForDoItRef.current.sayThanks();
        });
      UserService.updateUserSocialPoint(2);
      return superrequest.agentPost(`/api/v1/blog/i-will-do-this/${post._id}`).then((res) => {
        if (!res || !res.ok) {
          GlobalState.restoreFromSavedState(post, savedState, this);
          UserService.updateUserSocialPoint(-2);
        } else {
          // MessageDialogService.showSuccessMessage(ContextOptions.save.value, true);
        }
      });
    }

    GlobalState.updatePoint(post, 'totalIDo', -1, this);
    UserService.updateUserSocialPoint(-2);
    return superrequest.agentDelete(`/api/v1/blog/i-will-do-this/${post._id}`).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
        UserService.updateUserSocialPoint(2);
      } else {
        // MessageDialogService.showSuccessMessage(ContextOptions.save.value, false);
      }
    });
  }

  static handleOpenSavedPosts() {
    SavedPostsDialogService.openSavedPostsInNewHistory();
  }

  static handleOpenIWillDoThisPosts() {
    IDoPostsDialogService.openIDoPostsInNewHistory();
  }

  render() {
    const { allSmall } = this.props;
    let { post = {} } = this.props;
    const {
      _id = post._id,
      preview = post.preview,
      video = post.video,
      title = post.title,
      summary = post.summary,
      content = post.content,
      categories = post.categories,
      category = post.categories[0].type,
      createdAt = post.createdAt,
      authors = post.authors,
      totalRating = post.totalRating,
      totalVotes = post.totalVotes,
      rating = post.rating,
      isSaved = post.isSaved,
      totalSaved = post.totalSaved,
      iWillDoThis = post.iWillDoThis,
      totalIDo = post.totalIDo
    } = this.props;
    const {
      clickable,
      isVisible
    } = this.state;
    post = {
      _id,
      preview,
      video,
      title,
      summary,
      content,
      categories,
      category,
      createdAt,
      authors,
      totalRating,
      totalVotes,
      rating,
      isSaved,
      totalSaved,
      iWillDoThis,
      totalIDo
    };
    const postContextOptions = getContextOptions(post);
    const ratingInfo = {
      totalRating,
      totalVotes,
      rating: UserService.isLoggedIn && rating
    };

    const isReallySaved = UserService.isLoggedIn && isSaved;
    const addSavedPostOption = postContextOptions.find(
      option => option.value === ContextOptions.save.value
    );
    if (addSavedPostOption) {
      addSavedPostOption.label = !isReallySaved ? 'lưu bài viết' : 'bỏ lưu bài viết';
    }

    const isReallyIDo = UserService.isLoggedIn && iWillDoThis;
    const iWillDoThisOption = postContextOptions.find(
      option => option === ContextOptions.iWillDoThis
    );
    if (iWillDoThisOption) {
      iWillDoThisOption.label = !isReallyIDo
        ? iWillDoThisOption.labelAdd
        : iWillDoThisOption.labelRemove;
    }

    return (
      <Card className="post">
        <div className="post__rating">
          <Rating {...ratingInfo} onRating={this.handleRating} id={_id} />
        </div>
        <MDBPopover
          placement="top"
          clickable={clickable}
          isVisible={isVisible}
          domElement
          popover
          onChange={this.handlePopupChange}
          id={_id}
        >
          <span className={classnames('post__preview', { saved: isReallySaved, [category]: preview })}>
            {preview
              ? this.renderPreviewAsImage()
              : this.renderPreviewAsTitle()}
            {postContextOptions && (
              <div className="post__context-btn">
                <ContextButton options={postContextOptions} handler={this.handleContextActions} />
              </div>
            )}
            {isReallySaved && (
              <div className="post__bookmark">
                <IconBookmark
                  totalSaved={totalSaved}
                  onClick={Post.handleOpenSavedPosts}
                />
                <IconThanks ref={this.thankForSaveRef} text="Đã lưu bài viết" />
              </div>
            )}
            {isReallyIDo && (
              <div className="post__status-icon">
                <IconRaisedFist
                  totalIDo={totalIDo}
                  onClick={Post.handleOpenIWillDoThisPosts}
                />
                <IconThanks ref={this.thankForDoItRef} />
              </div>
            )}
          </span>
          <MDBPopoverBody>
            <div className="post__content">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false}
              />
            </div>
          </MDBPopoverBody>
        </MDBPopover>
        <CardBody className={classnames({ 'p-0': !preview && !summary })}>
          {preview && <div className="post__title"><b>{title}</b></div>}
          {(!preview || !allSmall) && summary && <div className="post__summary mt-2">{summary}</div>}
        </CardBody>
        <CardFooter className="d-flex align-items-center justify-content-stretch flex-wrap">
          <div className="flex-fill post__socials">
            {this.renderSocials()}
          </div>
          <div className="">
            <TimeAgo time={createdAt} />
          </div>
        </CardFooter>
      </Card>
    );
  }
}
