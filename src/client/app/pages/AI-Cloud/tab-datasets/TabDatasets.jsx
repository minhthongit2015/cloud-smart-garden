import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import BaseChart from '../../../components/charts/nivo/BaseChart';
import DemoData from './data';
import t from '../../../languages';
import BasePage from '../../_base/BasePage';

export default class TabDataset extends BasePage {
  constructor(props) {
    super(props, t('pages.aiCloud.title.datasets'));
  }

  render() {
    const { options } = this.props;
    const baseOptions = {

    };
    return (
      <React.Fragment>
        <section>Lựa chọn + Quan sát dataset</section>
        <section>Phân tích dataset</section>
        <section>Chỉnh sửa dataset</section>
        <section>Thử nghiệm lại trên các Experiment</section>
        <div>Cho phép Ctrl + Z</div>

        <Section>
          <SectionHeader>Dataset</SectionHeader>
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
