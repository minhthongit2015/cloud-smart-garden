import React from 'react';
import Post from '../../../components/blog-base/post/Post';
import DatasetService from '../../../services/AI/DatasetService';
import getContextOptions from '../../../components/blog/blog-post/BlogPostContextOptions';
import ContextButton from '../../../components/utils/context-button/ContextButton';
import TimeAgo from '../../../components/utils/time-ago/TimeAgo';


export default class extends Post {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return DatasetService;
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  render() {
    const {
      post: {
        title,
        createdAt
      } = {}
    } = this.props;

    return (
      <div>
        <div
          className="cursor-pointer text-center"
          onClick={this.handlePostClick}
        >
          <img
            src="/icons/AI/shipping-and-delivery.svg"
            alt={title}
            className="my-3"
            style={{ width: '60%' }}
          />
          <div className="text-golden small mb-1">
            <i><TimeAgo time={createdAt} noIcon /></i>
          </div>
          <div className="text-golden">
            {title}
          </div>
        </div>
        <div className="post__context-btn">
          <ContextButton
            color="orange"
            options={this.contextOptions}
            onSelect={this.handleContextActions}
          />
        </div>
      </div>
    );
  }
}
