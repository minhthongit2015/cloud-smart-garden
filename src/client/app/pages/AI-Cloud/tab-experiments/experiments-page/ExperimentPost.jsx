import React from 'react';
import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './ExperimentPostContextOptions';
import TimeAgo from '../../../../components/utils/time-ago/TimeAgo';
import ContextButton from '../../../../components/utils/context-button/ContextButton';


export default class extends Post {
  get model() {
    return this.props.type || 'Experiment';
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
          <img src="/images/cute-scientist.jpg" alt={title} />
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
