import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import ExperimentPostsModule from './experiments-page/ExperimentPostsModule';
import SubPageGroup from '../../_base/SubPageGroup';
import AnyDialogChecker from '../../../helpers/dialogs/any-dialog/AnyDialogChecker';


class TabExperiments extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.aiCloud.title.experiments'));
  }

  componentDidMount() {
    super.componentDidMount();
    AnyDialogChecker.runAllChecks();
  }

  render() {
    return (
      <React.Fragment>
        {/* <Section>
          <SectionHeader>{'> To do:'}</SectionHeader>
          <SectionBody>
            <ul>
              <li>Lựa chọn + Quan sát dataset</li>
              <li>Phân tích dataset</li>
              <li>Chọn model, thuật toán...</li>
              <li>Thử nghiệm -&gt; So sánh kết quả</li>
              <li>Cho phép Ctrl + Z</li>
            </ul>
          </SectionBody>
        </Section> */}
        <Section>
          <SectionHeader>Chế độ chăm sóc bạn đang nghiên cứu</SectionHeader>
          <SectionBody>
            <ExperimentPostsModule />
          </SectionBody>
        </Section>
      </React.Fragment>
    );
  }
}

export default TabExperiments;
