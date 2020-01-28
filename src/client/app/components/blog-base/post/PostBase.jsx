/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
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
import UserService from '../../../services/user/UserService';
import ShareButton from '../../facebook/ShareButton';
import Rating from '../../utils/rating/Rating';
import { IconBookmark, IconRaisedFist, IconThanks } from '../../../../assets/icons';
import SavedPostsDialogHelper from '../../../helpers/dialogs/SavedPostsDialogHelper';
import IDoPostsDialogHelper from '../../../helpers/dialogs/IDoPostsDialogHelper';
import BaseComponent from '../../BaseComponent';
import PostHelper from '../../../helpers/PostHelper';


export default class Post extends BaseComponent.Pure {
  get post() {
    return this.props.post;
  }

  get contextOptions() {
    return null;
  }

  constructor(props) {
    super(props);
    this.thankForDoItRef = React.createRef();
    this.thankForSaveRef = React.createRef();
    this.bind(
      this.handlePostClick, this.handlePreviewPopupChange,
      this.handleContextActions, this.handleRating
    );

    this.state = {
      clickable: false,
      isVisible: false
    };
  }

  handlePreviewPopupChange(state) {
    if (!state) {
      this.setState({
        clickable: false,
        isVisible: false
      });
    }
  }

  handlePostClick() {
    this.dispatchEvent({ type: 'postClick' }, this.post);
  }

  handleContextActions(event, option) {
    this.dispatchEvent(this.Events.contextActions, option, this.post, this);
  }

  handleRating(event, rating) {
    const { post } = this.props;
    this.dispatchEvent(event, rating, post);
  }

  static handleOpenSavedPosts() {
    this.dispatchEvent({ typez: 'openSavedPosts' }, this.post);
    SavedPostsDialogHelper.openSavedPostsInNewHistory();
  }

  static handleOpenIWillDoThisPosts() {
    this.dispatchEvent({ typez: 'openIDoPosts' }, this.post);
    IDoPostsDialogHelper.openIDoPostsInNewHistory();
  }

  renderPreviewAsImage() {
    const { preview } = this.post || {};
    return (
      <div onClick={this.handlePostClick}>
        <MDBCardImage
          className="img-fluid post__preview-image"
          src={preview}
        />
      </div>
    );
  }

  renderPreviewAsTitle() {
    const { title, categories } = this.post || {};
    const category = categories && categories[0] && categories[0].type;
    return (
      <CardHeader className={category} onClick={this.handlePostClick}>{title}</CardHeader>
    );
  }

  renderSocials() {
    return (
      <div className="d-flex post__sharing-facebook">
        <ShareButton url={PostHelper.buildPostUrl(this.post)} className="" />
      </div>
    );
  }

  renderPostPreviewPopup() {
    const {
      post: {
        content
      } = {}
    } = this.props;
    return (
      <ReactMarkdown
        className="markdown"
        source={content}
        escapeHtml={false}
      />
    );
  }

  render() {
    const {
      post: {
        _id,
        preview,
        // video,
        title,
        summary,
        // content,
        // categories,
        category,
        createdAt,
        // authors,
        totalRating,
        totalVotes,
        rating,
        isSaved,
        totalSaved,
        iWillDoThis,
        totalIDo
      } = {},
      allSmall
    } = this.props;

    const {
      clickable, isVisible
    } = this.state;

    const ratingInfo = {
      totalRating,
      totalVotes,
      rating: UserService.isLoggedIn && rating
    };

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
          onChange={this.handlePreviewPopupChange}
          id={_id}
        >
          <span className={classnames('post__preview', { saved: isSaved, [category]: preview })}>
            {preview
              ? this.renderPreviewAsImage()
              : this.renderPreviewAsTitle()}
            {this.contextOptions && (
              <div className="post__context-btn">
                <ContextButton options={this.contextOptions} onSelect={this.handleContextActions} />
              </div>
            )}
            {isSaved && (
              <div className="post__bookmark">
                <IconBookmark
                  totalSaved={totalSaved}
                  onClick={Post.handleOpenSavedPosts}
                />
                <IconThanks ref={this.thankForSaveRef} text="Đã lưu bài viết" />
              </div>
            )}
            {iWillDoThis && (
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
              {this.renderPostPreviewPopup()}
            </div>
          </MDBPopoverBody>
        </MDBPopover>
        <CardBody className={!preview && !summary ? 'p-0' : 'p-2'}>
          {preview && <div className="post__title"><b>{title}</b></div>}
          {(!preview || !allSmall) && summary && <div className="post__summary mt-2">{summary}</div>}
        </CardBody>
        <CardFooter className="d-flex align-items-center justify-content-stretch flex-wrap p-2">
          <div className="flex-fill post__socials">
            {this.renderSocials()}
          </div>
          <div className="">
            <TimeAgo time={createdAt} className="small" />
          </div>
        </CardFooter>
      </Card>
    );
  }
}
