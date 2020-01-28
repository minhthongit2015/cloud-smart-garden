import React from 'react';
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewExperimentPost from './NewExperimentPost';
import ExperimentPost from './ExperimentPost';
import InfinitePostList from '../../../../components/blog-base/infinite-post-list/InfinitePostList';


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
