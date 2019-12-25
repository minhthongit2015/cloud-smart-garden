import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';

export default class TabProjects extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.aiCloud.title.projects'));
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
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
          {/* <PostsModule /> */}
        </SectionBody>
      </Section>
    );
  }
}
