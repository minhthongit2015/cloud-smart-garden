import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';

class TabAICloud extends Component {
  render() {
    return (
      <Section>
        <SectionHeader>AI CLoud ~ Sharing your Knowledge..</SectionHeader>
        <SectionBody>
          <ul>
            <li>Danh sách Projects</li>
            <li>Danh sách Experiments</li>
            <li>Danh sách Trained Models</li>
            <li>Danh sách Dataset</li>
            <li>Danh sách Trained Models được chia sẻ</li>
          </ul>
        </SectionBody>
      </Section>
    );
  }
}

export default TabAICloud;
