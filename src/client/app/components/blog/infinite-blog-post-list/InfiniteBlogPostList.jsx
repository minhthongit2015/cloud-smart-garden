/* eslint-disable class-methods-use-this */
import React from 'react';
import InfinitePostList from '../../blog-base/infinite-post-list/InfinitePostList';
import BlogPostList from '../blog-post-list/BlogPostList';


export default class extends InfinitePostList {
  renderPostList() {
    return <BlogPostList {...this.postListProps} />;
  }
}
