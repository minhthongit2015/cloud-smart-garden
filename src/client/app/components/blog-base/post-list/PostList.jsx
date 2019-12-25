/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';
import UserService from '../../../services/user/UserService';
import FbService from '../../../services/user/FbService';
import BaseComponent from '../../BaseComponent';


export default class PostList extends BaseComponent {
  get posts() {
    return this.props.posts;
  }

  get PostComponent() {
    return Post;
  }

  get postProps() {
    const { showContextMenu, allSmall } = this.props;
    return { onContextActions: this.handleContextActions, showContextMenu, allSmall };
  }

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.handleContextActions = this.handleContextActions.bind(this);
    this.processing = null;
    UserService.useUserState(this);
  }

  shouldComponentUpdate(newProps) {
    const willUpdate = !(this.props.posts && newProps.posts
      && newProps.posts.length === this.props.posts.length)
      || newProps.hasPermission !== this.props.hasPermission;
    if (willUpdate) {
      this.processing = null;
    }
    return willUpdate;
  }

  handleContextActions(event, option, post, postComponent) {
    this.dispatchEvent(event, option, post, postComponent);
  }

  async mappingPost(posts) {
    return posts;
  }

  handleMappingPostDone() {
    FbService.parseButtons('.post__sharing-facebook');
    if (this._isMounted && this.shuffle) {
      this.forceUpdate(() => {
        this.shuffle.resetItems();
        this.shuffle.layout();
      });
      setTimeout(() => {
        if (this.shuffle) {
          this.shuffle.layout();
        }
      }, 1000);
    }
  }

  renderPostList() {
    const { posts } = this.props;
    return (
      <div ref={this.containerRef} className="mt-5">
        {posts && posts.map(post => PostList.renderPostWithWrapper(post))}
      </div>
    );
  }

  renderPostWithWrapper(post) {
    return (
      <div
        key={post._id}
        className={`post-wrapper p-0 ${post.previewClass || ''}`}
      >
        <div className="px-2 pt-4 pt-md-2">
          {this.renderPost(post)}
        </div>
      </div>
    );
  }

  renderPost(post) {
    const PostComponent = this.props.PostComponent || this.PostComponent;
    return (
      <PostComponent
        post={post}
        {...this.postProps}
      />
    );
  }

  render() {
    const { posts = [] } = this.props;
    if (this.processing) return null;

    if (posts.length > 0 && this.processing === null) {
      this.mappingPost(posts).then(() => {
        this.processing = false;
        this.handleMappingPostDone();
      });
    }

    return this.renderPostList();
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: undefined
};
