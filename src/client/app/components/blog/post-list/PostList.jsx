import React from 'react';
import PropTypes from 'prop-types';
import Shuffle from 'shufflejs';
// eslint-disable-next-line import/no-cycle
import Post from '../post/Post';
import './PostList.scss';
import UserService from '../../../services/UserService';
import FbService from '../../../services/FbService';


export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.sizerElementRef = React.createRef();
    this.handleActions = this.handleActions.bind(this);
    this.processing = null;
    UserService.useUserState(this);
  }

  componentDidMount() {
    this.shuffle = new Shuffle(this.containerRef.current, '.post-wrapper', {
      sizer: this.sizerElementRef.current,
      speed: 0,
      throttleTime: 0,
      roundTransforms: true
    });
    this._isMounted = true;
    [350, 650, 1000].forEach((timeout) => {
      setTimeout(() => {
        if (this.shuffle) {
          this.shuffle.update();
        }
      }, timeout);
    });
  }

  componentDidUpdate() {
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    this.shuffle.destroy();
    this.shuffle = null;
    this._isMounted = false;
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

  handleActions(event, option, post, postComponent) {
    if (this.props.handleActions) {
      this.props.handleActions(event, option, post, postComponent);
    }
  }

  mapPreviews(posts) {
    return Promise.all(posts.map(post => new Promise((resolve) => {
      const { allSmall } = this.props;

      if (post.previewClass) {
        resolve(post);
        return;
      }
      if (!post.preview) {
        post.previewClass = allSmall ? 'w1' : PostList.smartSize(null, post);
        resolve(post);
        return;
      }
      this.processing = true;
      const image = document.createElement('img');
      image.src = post.preview;

      if (image.naturalWidth > 0 || image.complete) {
        post.previewClass = allSmall ? 'w1' : PostList.smartSize(image, post);
        resolve(post);
      } else {
        image.onload = () => {
          post.previewClass = allSmall ? 'w1' : PostList.smartSize(image, post);
          resolve(post);
        };
      }
    })));
  }

  static smartSize(image, post) {
    const contentLength = post.title.length + post.summary.length;
    if (image == null) {
      if (contentLength > 70) {
        return 'w3';
      }
      if (contentLength > 30) {
        return 'w2';
      }
      return 'w1';
    }

    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const ratio = width / height;
    if (ratio > 1) { // width > height
      if (contentLength > 400) {
        return 'w4';
      } if (contentLength > 300) {
        return 'w3';
      } if (contentLength > 100) {
        return 'w2';
      }
      if (ratio > 4) {
        return 'w4';
      } if (ratio > 3) {
        return 'w3';
      } if (ratio > 2) {
        return 'w2';
      }
      return 'w1';
    } if (ratio === 1) {
      if (contentLength > 100) {
        return 'w2';
      }
      return 'w1';
    } // height > width
    if (contentLength > 500) {
      return 'w4';
    } if (contentLength > 400) {
      return 'w3';
    } if (contentLength > 100) {
      return 'w2';
    }
    return 'w1';
  }

  static renderPost(key, content, post) {
    return (
      <div
        key={key}
        className={`post-wrapper p-0 ${post.previewClass || ''}`}
      >
        <div className="px-2 pt-4 pt-md-2">
          {content}
        </div>
      </div>
    );
  }

  render() {
    const {
      children, posts = [], hasPermission, allSmall
    } = this.props;
    if (this.processing) return null;
    if (posts.length > 0 && this.processing === null) {
      this.mapPreviews(posts).then(() => {
        this.processing = false;
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
      });
    }

    return (
      <div ref={this.containerRef} className="mt-5">
        <div className="sizer-element" ref={this.sizerElementRef} />
        <div className="post-wrapper w4 p-0" />
        {(posts && posts.map(post => (
          PostList.renderPost(post._id,
            <Post
              post={post}
              handleActions={this.handleActions}
              showContextMenu={hasPermission}
              allSmall={allSmall}
            />, post)
        )))
        || (children && children.map(post => (
          PostList.renderPost(post.key, post, post.props.post)
        )))
        }
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: undefined
};
