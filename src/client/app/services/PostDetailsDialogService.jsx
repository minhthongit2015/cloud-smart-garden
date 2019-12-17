import React from 'react';
import PageDialogService from './PageDialogService';
import PostDetails from '../components/blog/post-details/PostDetails';
import PostService from './PostService';

export default class extends PageDialogService {
  static shouldOpenWithState(post) {
    return post && post.baseOrder;
  }

  static renderPageDialog(post) {
    return <PostDetails post={post} />;
  }

  // Direct access
  static async openPostDetailsCurrentTab(postOrder) {
    return PostService.fetchPost(postOrder).then((res) => {
      if (res && res.data) {
        const post = res.data[0];
        this.openInCurrentHistory({
          url: PostService.buildPostUrl(post, { keepQuery: true }),
          title: post.title,
          state: post
        });
      }
    });
  }

  // Open when click to a post
  static openPostDetailsDialog(post) {
    return this.openInNewHistory({
      url: PostService.buildPostUrl(post, { keepQuery: true }),
      title: post.title,
      state: post
    });
  }
}
