import React from 'react';
import BasePage from './BasePage';
import PostService from '../../services/blog/PostService';
import SavedPostsDialogHelper from '../../helpers/dialogs/SavedPostsDialogHelper';
import PostDetailsDialogHelper from '../../helpers/dialogs/PostDetailsDialogHelper';
import { Section, SectionHeader, SectionBody } from '../../layouts/base/section';
import DeepMessage from '../../components/utils/messages/DeepMessage';
import PostsModule from '../../components/blog/posts-module/PostsModule';
import GuideMessage from '../../components/utils/messages/GuideMessage';
import InfinitePostList from '../../components/blog/infinite-post-list/InfinitePostList';


export default class extends BasePage {
  constructor(props) {
    super(props, props.title);
    this.setBlogData(this.props);
  }

  setBlogData({
    categories, rootCategory, mainMessage, guideMessage, everyoneCanPost
  }) {
    this.setCategories(categories);
    this.setRootCategory(rootCategory);
    this.setMainMessage(mainMessage);
    this.setGuideMessage(guideMessage);
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

  setMainMessage(mainMessage) {
    this.mainMessage = mainMessage;
    return this;
  }

  setGuideMessage(guideMessage) {
    this.guideMessage = guideMessage;
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

  render() {
    return (
      <Section>
        <SectionHeader>
          {this.mainMessage && <DeepMessage>{this.mainMessage}</DeepMessage>}
          {this.guideMessage && <GuideMessage>{this.guideMessage}</GuideMessage>}
        </SectionHeader>
        <SectionBody>
          <PostsModule
            rootCategory={this.rootCategory}
            categories={this.categories}
            PostList={InfinitePostList}
            everyoneCanPost={this.everyoneCanPost}
          />
        </SectionBody>
      </Section>
    );
  }
}
