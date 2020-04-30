/* eslint-disable class-methods-use-this */
import React from 'react';
import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './TrainedModelContextOptions';
import { ModelName } from '../../../../utils/Constants';
import RatioRect from '../../../../components/utils/ratio-rect/RatioRect';
import ContextButton from '../../../../components/utils/context-button/ContextButton';
import TimeAgo from '../../../../components/utils/time-ago/TimeAgo';


export default class extends Post {
  get model() {
    return ModelName.trainedModel;
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
      <RatioRect ratio={4 / 6}>
        <div
          className="mockup-book h-100 cursor-pointer overlapable"
          onClick={this.handlePostClick}
        >
          <div className="overlap bottom text-golden small mb-1">
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
      </RatioRect>
    );
  }
}
