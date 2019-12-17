import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import EarthPicturePosts from './YourQuestionPosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.main'));
    this.category = 'YourQuestion';
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule rootCategory={this.category} PostList={EarthPicturePosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
