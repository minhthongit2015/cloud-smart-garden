import React from 'react';
import PostService from '../../services/blog/PostService';
import SavedPostsDialogHelper from '../../helpers/dialogs/SavedPostsDialogHelper';
import PostDetailsDialogHelper from '../../helpers/dialogs/PostDetailsDialogHelper';
import { Section, SectionHeader, SectionBody } from '../../layouts/base/section';
import SubPageGroup from './SubPageGroup';
import BlogPostsModule from '../../components/blog/blog-posts-module/BlogPostsModule';


export default class extends SubPageGroup {
  constructor(props) {
    super(props);
    this.setBlogData(this.props);
  }

  setBlogData({
    categories, everyoneCanPost
  }) {
    this.setCategories(categories);
    this.setEveryoneCanPost(everyoneCanPost);
  }

  setCategories(categories) {
    this.categories = typeof categories === 'string' ? categories.split(',') : categories;
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
      <BlogPostsModule
        categories={this.categories}
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
