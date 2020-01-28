import React from 'react';
import PageDialogHelper from './PageDialogHelper';
import PostDetails from '../../components/blog-base/post-details/PostDetails';
import PostService from '../../services/blog/PostService';
import PostHelper from '../PostHelper';

export default class extends PageDialogHelper {
  static checkToOpen() {
    const params = new URLSearchParams(window.location.search);
    const hashtag = params.get('hashtag');
    if (hashtag) {
      this.openPostDetailsCurrentTab(hashtag);
      PostService.refreshCache();
    }
  }

  static shouldOpenWithState(post) {
    return post && post.baseOrder;
  }

  static renderPageDialog(post) {
    return <PostDetails post={post} />;
  }

  // Direct access
  static async openPostDetailsCurrentTab(postOrder) {
    return PostService.fetchPost(postOrder).then((res) => {
      const post = res.data[0];
      this.openInCurrentHistory({
        url: PostHelper.buildPostUrl(post, { keepQuery: true }),
        title: post.title,
        state: post
      });
    });
  }

  // Open when click to a post
  static openPostDetailsDialog(post) {
    return this.openInNewHistory({
      url: PostHelper.buildPostUrl(post, { keepQuery: true }),
      title: post.title,
      state: post
    });
  }
}
