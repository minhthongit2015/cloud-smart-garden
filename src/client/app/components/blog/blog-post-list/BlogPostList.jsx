/* eslint-disable class-methods-use-this */
import React from 'react';
import ShufflePostList from '../../blog-base/shuffle-post-list/ShufflePostList';
import BlogPost from '../blog-post/BlogPost';


export default class extends ShufflePostList {
  renderPost(post) {
    return (
      <BlogPost
        post={post}
        {...this.postProps}
      />
    );
  }
}
