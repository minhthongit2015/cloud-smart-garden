import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import BaseChart from '../../../components/charts/BaseChart';
import DemoData from './data';

class TabExperiments extends Component {
  render() {
    const { options } = this.props;
    const baseOptions = {

    };
    return (
      <Section>
        <SectionHeader>Experiments</SectionHeader>
        <SectionBody>
          <ul>
            <li>Lựa chọn + Quan sát dataset</li>
            <li>Phân tích dataset</li>
            <li>Chọn model, thuật toán...</li>
            <li>Thử nghiệm -&gt; So sánh kết quả</li>
            <li>Cho phép Ctrl + Z</li>
          </ul>
          <BaseChart
            options={{
              ...options,
              ...baseOptions
            }}
            data={DemoData}
          />
        </SectionBody>
      </Section>
    );
  }
}

export default TabExperiments;
