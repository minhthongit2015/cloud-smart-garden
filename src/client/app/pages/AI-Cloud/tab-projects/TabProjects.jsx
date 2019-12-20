import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import BasePage from '../../_base/BasePage';

export default class TabProjects extends BasePage {
  constructor(props) {
    super(props, t('pages.aiCloud.title.projects'));
  }

  render() {
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
      </Section>
    );
  }
}
