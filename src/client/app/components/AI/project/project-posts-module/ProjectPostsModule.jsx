import React from 'react';
import PostsModule from '../../../blog-base/posts-module/PostsModule';
import NewProjectPost from '../new-project-post/NewProjectPost';
import ProjectPost from '../project-post/ProjectPost';
import InfinitePostList from '../../../blog-base/infinite-post-list/InfinitePostList';

export default class extends PostsModule {
  get postType() {
    return this.props.type || 'Project';
  }

  render() {
    return (
      <React.Fragment>
        <NewProjectPost {...this.newPostProps} />
        <InfinitePostList PostComponent={ProjectPost} {...this.postListProps} />
      </React.Fragment>
    );
  }
}
