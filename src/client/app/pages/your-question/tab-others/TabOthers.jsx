import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import OthersPosts from './OthersPosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.others'));
    this.category = ['AskForOthers'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={OthersPosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
