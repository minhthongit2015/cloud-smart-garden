import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import AdminPage from '../../_base/AdminPage';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.intranet.title.memberSpotlight'));
  }


  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.intranet.message.memberSpotlight')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <div>Tiêu điểm thành viên</div>
        </SectionBody>
      </Section>
    );
  }
}
