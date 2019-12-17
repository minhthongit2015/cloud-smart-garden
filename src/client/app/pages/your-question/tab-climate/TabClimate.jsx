import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import ClimatePosts from './ClimatePosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.climate'));
    this.category = ['AskForClimate'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={ClimatePosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
