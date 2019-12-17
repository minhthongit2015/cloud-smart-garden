import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import AdminPage from '../../_base/AdminPage';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.admin.title.dashboard'));
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.error = true;
      this.forceUpdate();
    }, 4000);
    if (this.error) {
      throw new Error('heee');
    }

    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.admin.message.dashboard')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <div>Hello Dashboard</div>
        </SectionBody>
      </Section>
    );
  }
}
