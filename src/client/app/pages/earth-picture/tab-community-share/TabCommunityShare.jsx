import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import CommunitySharePosts from './CommunitySharePosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';
import GuideMessage from '../../../components/utils/messages/GuideMessage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.communityShare'));
    this.category = ['CommunityShare'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <GuideMessage>{t('pages.earthPicture.communityGuideMessage')}</GuideMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={CommunitySharePosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
