import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import AdminPage from '../../_base/AdminPage';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.intranet.title.intranet'));
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.intranet.message.intranet')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <div>Welcome to the Tomorrowland!</div>
        </SectionBody>
      </Section>
    );
  }
}
