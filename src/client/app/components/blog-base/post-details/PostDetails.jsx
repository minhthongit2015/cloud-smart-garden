/* eslint-disable class-methods-use-this */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import Video from '../../utils/video/Video';
import ShareButton from '../../facebook/ShareButton';
import SocialEntityService from '../../../services/blog/PostService';
import FbService from '../../../services/user/FbService';
import GlobalState from '../../../utils/GlobalState';
import UserService from '../../../services/user/UserService';
import t from '../../../languages';
import Rating from '../../utils/rating/Rating';
import NewsTracker from '../../../services/blog/NewsTracker';
import PostHelper from '../../../helpers/PostHelper';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';
import BaseComponent from '../../_base/BaseComponent';


export default class PostDetails extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.handleRating = this.handleRating.bind(this);
  }

  componentDidMount() {
    this.parseFBButtons();
    this.markAsRead();
  }

  // eslint-disable-next-line class-methods-use-this
  parseFBButtons() {
    FbService.parseButtons('.post-details__action-buttons');
  }

  markAsRead() {
    const { data: post } = this.props;
    NewsTracker.markAsRead(post);
  }

  handleRating(event, rating) {
    const { data: post } = this.props;
    if (!UserService.isLoggedIn) {
      AnyDialogHelper.openLogin(t('components.loginDialog.loginToRating'));
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

    SocialEntityService.rating(post, rating, this.ratingEndpoint).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
        UserService.updateUserSocialPoint(-1);
      } else {
        UserService.updateUser(res.data.user);
      }
    });
  }

  renderBelowPreview() {
    return null;
  }

  render() {
    const { data: post = {} } = this.props;
    const {
      _id, previewPhoto, video, title, summary, content, categories, createdAt,
      totalRating, totalVotes, rating
    } = post;
    const ratingInfo = {
      totalRating,
      totalVotes,
      rating: UserService.isLoggedIn && rating
    };

    return (
      <div className="post-details container">
        <Row>
          <Col size="12" md="8" className="mb-3">
            {(previewPhoto || video) && (
              <React.Fragment>
                <div className="post-details__categories mb-2 border-left pl-2">
                  <span className="post-details__categories__label">Chuyên mục: </span>
                  {categories.map(category => (
                    <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                  ))}
                </div>
                {video ? (
                  <Video title={title} src={video} preview={previewPhoto} />
                ) : (
                  <img alt={title} src={previewPhoto} className="w-100" />
                )}
              </React.Fragment>
            )}
            {this.renderBelowPreview()}
          </Col>
          <Col size="12" md={previewPhoto ? '4' : '12'}>
            <div className="post-details__title">{title}</div>
            <sup key="1" className="post-details__time text-sm mr-2"><TimeAgo time={createdAt} /></sup>
            <div className="post-details__action-buttons d-flex flex-wrap justify-content-between mt-2">
              <Rating {...ratingInfo} onRating={this.handleRating} id={_id} />
              <ShareButton url={PostHelper.buildPostUrl(post)} />
            </div>
            {!previewPhoto && (
              <React.Fragment>
                <sup key="2"> | </sup>
                <sup key="3" className="post-details__categories ml-2">
                  <span className="post-details__categories__label">Chuyên mục: </span>
                  {categories.map(category => (
                    <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                  ))}
                </sup>
              </React.Fragment>
            )}
            <hr className="my-3" />
            {summary && (
              <div className="post-details__summary mt-3">{summary}</div>
            )}
            <div className="post-details__content mt-3">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false} // Do not turn it on for now
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
