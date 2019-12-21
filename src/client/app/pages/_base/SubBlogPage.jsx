import React from 'react';
import PostService from '../../services/blog/PostService';
import SavedPostsDialogHelper from '../../helpers/dialogs/SavedPostsDialogHelper';
import PostDetailsDialogHelper from '../../helpers/dialogs/PostDetailsDialogHelper';
import { Section, SectionHeader, SectionBody } from '../../layouts/base/section';
import PostsModule from '../../components/blog/posts-module/PostsModule';
import InfinitePostList from '../../components/blog/infinite-post-list/InfinitePostList';
import SubPageGroup from './SubPageGroup';


export default class extends SubPageGroup {
  constructor(props) {
    super(props);
    this.setBlogData(this.props);
  }

  setBlogData({
    categories, rootCategory, everyoneCanPost
  }) {
    this.setCategories(categories);
    this.setRootCategory(rootCategory);
    this.setEveryoneCanPost(everyoneCanPost);
  }

  setCategories(categories) {
    this.categories = typeof categories === 'string' ? [categories] : categories;
    return this;
  }

  setRootCategory(rootCategory) {
    this.rootCategory = rootCategory;
    return this;
  }

  setEveryoneCanPost(everyoneCanPost) {
    this.everyoneCanPost = everyoneCanPost;
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    const params = new URLSearchParams(window.location.search);

    const isShowSavedPost = params.get('saved-posts');
    if (isShowSavedPost) {
      SavedPostsDialogHelper.openSavedPostsInCurrentHistory();
    }

    const hashtag = params.get('hashtag');
    if (hashtag) {
      PostDetailsDialogHelper.openPostDetailsCurrentTab(hashtag);
      PostService.refreshCache();
    }
  }

  renderBody() {
    return (
      <PostsModule
        rootCategory={this.rootCategory}
        categories={this.categories}
        PostList={InfinitePostList}
        everyoneCanPost={this.everyoneCanPost}
      />
    );
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          {this.renderHeader()}
        </SectionHeader>
        <SectionBody>
          {this.renderBody()}
        </SectionBody>
      </Section>
    );
  }
}
