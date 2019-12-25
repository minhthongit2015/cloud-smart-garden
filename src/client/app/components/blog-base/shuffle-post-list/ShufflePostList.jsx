/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import React from 'react';
import Shuffle from 'shufflejs';
import './ShufflePostList.scss';
import PostList from '../post-list/PostList';


export default class ShufflePostList extends PostList {
  constructor(props) {
    super(props);
    this.sizerElementRef = React.createRef();
  }

  componentDidMount() {
    super.componentDidMount();
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
    super.componentWillUnmount();
    this.shuffle.destroy();
    this.shuffle = null;
  }

  mappingPost(posts) {
    // eslint-disable-next-line consistent-return
    return Promise.all(posts.map(post => new Promise((resolve) => {
      const { allSmall } = this.props;
      if (allSmall) {
        post.previewClass = 'w1';
        return Promise.resolve(post);
      }
      if (post.previewClass) {
        return resolve(post);
      }
      if (!post.preview) {
        post.previewClass = this.getPostSize(null, post);
        return resolve(post);
      }

      this.processing = true;
      const image = document.createElement('img');
      image.src = post.preview;

      if (image.naturalWidth > 0 || image.complete) {
        post.previewClass = this.getPostSize(image, post);
        return resolve(post);
      }
      image.onload = () => {
        post.previewClass = this.getPostSize(image, post);
        resolve(post);
      };
    })));
  }

  handleMappingPostDone() {
    super.handleMappingPostDone();
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

  getPostSize(image, post) { // return one of ['w1', 'w2', 'w3', 'w4']
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

  renderPostList() {
    const { posts } = this.props;
    return (
      <div ref={this.containerRef} className="mt-5">
        <div className="sizer-element" ref={this.sizerElementRef} />
        <div className="post-wrapper w4 p-0" />
        {posts && posts.map(post => this.renderPostWithWrapper(post))}
      </div>
    );
  }
}
