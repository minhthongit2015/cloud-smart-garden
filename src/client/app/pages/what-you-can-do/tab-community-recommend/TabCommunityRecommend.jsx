import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import CommunityRecommendPosts from './CommunityRecommendPosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';
import GuideMessage from '../../../components/utils/messages/GuideMessage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.communityRecommend'));
    this.category = ['CommunityRecommend'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <GuideMessage>{t('pages.whatYouCanDo.communityGuideMessage')}</GuideMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule
            categories={this.category}
            PostList={CommunityRecommendPosts}
            everyoneCanPost
          />
        </SectionBody>
      </Section>
    );
  }
}
