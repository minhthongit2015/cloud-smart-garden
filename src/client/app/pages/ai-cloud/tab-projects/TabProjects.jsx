import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';

export default class TabProjects extends Component {
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
