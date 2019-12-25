import React from 'react';
import PostsModule from '../../blog-base/posts-module/PostsModule';
import NewBlogPost from '../new-blog-post/NewBlogPost';
import InfiniteBlogPostList from '../infinite-blog-post-list/InfiniteBlogPostList';


export default class extends PostsModule {
  render() {
    return (
      <React.Fragment>
        <NewBlogPost {...this.newPostProps} />
        <InfiniteBlogPostList {...this.postListProps} />
      </React.Fragment>
    );
  }
}
