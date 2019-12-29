/* eslint-disable import/no-cycle */
import React from 'react';
import superrequest from '../../utils/superrequest';
import PageDialogHelper from './PageDialogHelper';
import DeepMessage from '../../components/utils/messages/DeepMessage';
import InfinitePostList from '../../components/blog-base/infinite-post-list/InfinitePostList';
import ApiEndpoints from '../../utils/ApiEndpoints';


const defaultState = { isSavedPostsPage: true };

export default class extends PageDialogHelper {
  static shouldOpenWithState(state) {
    return state && state.isSavedPostsPage != null;
  }

  static checkToOpen() {
    const params = new URLSearchParams(window.location.search);
    const isShowSavedPost = params.get('saved-posts');
    if (isShowSavedPost) {
      this.openSavedPostsInCurrentHistory();
    }
  }

  static renderPageDialog() {
    return (
      <React.Fragment>
        <DeepMessage>Bài Viết Đã Lưu</DeepMessage>
        <InfinitePostList
          parentPage="saved-posts"
          noPostMsg="chưa có bài viết nào được lưu"
          endMessage=""
          endPoint={ApiEndpoints.savedPosts}
          mappingRes={this.mappingRes}
          allSmall
          scrollableTarget="page-dialog-instance"
        />
      </React.Fragment>
    );
  }

  static async openNoHistory() {
    this.show({ isSavedPostsPage: true });
  }

  static openSavedPostsInCurrentHistory() {
    this.openInCurrentHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static openSavedPostsInNewHistory() {
    this.openInNewHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static async fetchSavedPosts() {
    return superrequest.get(ApiEndpoints.savedPost)
      .then(this.mappingRes);
  }

  static mappingRes(res) {
    if (res && res.data) {
      res.data.forEach((savedPost) => {
        savedPost.isSaved = true;
      });
    }
    return res;
  }

  static getSavePageUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('saved-posts', 'open');
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, pathname, hash
    } = window.location;
    return `${protocol}//${host}${pathname}${search}${hash}`;
  }

  static getPageTitle() {
    return 'Bài viết đã lưu | Climate Strike Vietnam';
  }
}
