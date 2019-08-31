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
      <React.Fragment>
        <section>Lựa chọn + Quan sát dataset</section>
        <section>Phân tích dataset</section>
        <section>Chọn model, thuật toán...</section>
        <section>Thử nghiệm -&gt; So sánh kết quả</section>
        <div>Cho phép Ctrl + Z</div>

        <Section>
          <SectionHeader>Experiments</SectionHeader>
          <SectionBody>
            <BaseChart
              options={{
                ...options,
                ...baseOptions
              }}
              data={DemoData}
            />
          </SectionBody>
        </Section>
      </React.Fragment>
    );
  }
}

export default TabExperiments;
