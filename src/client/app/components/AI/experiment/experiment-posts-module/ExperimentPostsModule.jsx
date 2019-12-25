import React from 'react';
import PostsModule from '../../../blog-base/posts-module/PostsModule';
import NewExperimentPost from '../new-experiment-post/NewExperimentPost';
import ExperimentPost from '../experiment-post/ExperimentPost';
import InfinitePostList from '../../../blog-base/infinite-post-list/InfinitePostList';

export default class extends PostsModule {
  get postType() {
    return this.props.type || 'Experiment';
  }

  render() {
    return (
      <React.Fragment>
        <NewExperimentPost {...this.newPostProps} />
        <InfinitePostList PostComponent={ExperimentPost} {...this.postListProps} />
      </React.Fragment>
    );
  }
}
