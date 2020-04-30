import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import DynamicTrainedModels from '../tab-trained-models/trained-models-page/DynamicTrainedModels';

class TabAICloud extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.aiCloud.title.aiCloud'));
  }

  render() {
    return (
      <Section>
        <SectionHeader>Sharing your Knowledge..</SectionHeader>
        <SectionBody>
          <DynamicTrainedModels />
          {/* <ul>
            <li>Danh sách Projects</li>
            <li>Danh sách Experiments</li>
            <li>Danh sách Trained Models</li>
            <li>Danh sách Dataset</li>
            <li>Danh sách Trained Models được chia sẻ</li>
          </ul> */}
        </SectionBody>
      </Section>
    );
  }
}

export default TabAICloud;
