import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import SupportingPosts from './SupportingPosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.supporting'));
    this.category = ['DoSupporting'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.whatYouCanDo.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={SupportingPosts} />
        </SectionBody>
      </Section>
    );
  }
}
