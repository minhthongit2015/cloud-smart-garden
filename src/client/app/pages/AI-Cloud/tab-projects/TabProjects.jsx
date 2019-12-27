import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import ProjectPostsModule from '../../../components/AI/project/project-posts-module/ProjectPostsModule';

export default class TabProjects extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.aiCloud.title.projects'));
    this.categories = undefined;
    this.everyoneCanPost = true;
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    console.log('render tab project');
    return (
      <Section>
        <SectionHeader>Projects</SectionHeader>
        <SectionBody>
          <ul>
            <li>Quản lý các dự án nghiên cứu</li>
            <li>Trong mỗi dự án sẽ đi kèm một số Model và Experiment</li>
            <li>Sử dụng như thư mục quản lý các Experiment và Model</li>
          </ul>
        </SectionBody>
        <SectionBody>
          <ProjectPostsModule
            categories={this.categories}
            everyoneCanPost={this.everyoneCanPost}
          />
        </SectionBody>
      </Section>
    );
  }
}
