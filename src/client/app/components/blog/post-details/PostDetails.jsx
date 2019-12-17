import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'mdbreact';
import './PostDetails.scss';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import Video from '../../utils/video/Video';
import ShareButton from '../../facebook/ShareButton';
import PostService from '../../../services/PostService';
import FbService from '../../../services/FbService';
import GlobalState from '../../../utils/GlobalState';
import UserService from '../../../services/UserService';
import LoginDialogService from '../../../services/LoginDialogService';
import t from '../../../languages';
import superrequest from '../../../utils/superrequest';
import Rating from '../../utils/rating/Rating';
import NewsTracker from '../../../services/NewsTracker';


export default class PostDetails extends React.PureComponent {
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
    const { post } = this.props;
    NewsTracker.markAsRead(post);
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
    this.forceUpdate(() => {
      // this.parseFBButtons();
    });

    superrequest.agentPost(`/api/v1/blog/rating/${post._id}`, {
      rating
    }).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this)
          .then(() => {
            // this.parseFBButtons();
          });
        UserService.updateUserSocialPoint(-1);
      } else {
        Object.assign(UserService.user, res.data.user);
        UserService.setUser(UserService.user);
      }
    });
  }

  render() {
    const { post = {} } = this.props;
    const {
      _id, preview, video, title, summary, content, categories, createdAt,
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
          {(preview || video) && (
            <Col size="12" md="8" className="mb-3">
              <div className="post-details__categories mb-2 border-left pl-2">
                <span className="post-details__categories__label">Chuyên mục: </span>
                {categories.map(category => (
                  <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                ))}
              </div>
              {video ? (
                <Video title={title} src={video} preview={preview} />
              ) : (
                <img alt={title} src={preview} className="w-100" />
              )}
            </Col>
          )}
          <Col size="12" md={preview ? '4' : '12'}>
            <div className="post-details__title">{title}</div>
            <sup key="1" className="post-details__time text-sm mr-2"><TimeAgo time={createdAt} /></sup>
            <div className="post-details__action-buttons d-flex justify-content-between mt-2">
              <Rating {...ratingInfo} onRating={this.handleRating} id={_id} />
              <ShareButton url={PostService.buildPostUrl(post)} />
            </div>
            {!preview && (
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
