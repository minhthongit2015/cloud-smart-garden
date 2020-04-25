import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import StandalonePage from '../../_base/StandalonePage';
import GardenModule from '../../my-garden/tab-my-garden/GardenModule';
import StationModule from '../../my-garden/tab-stations/StationModule';


export default class extends StandalonePage {
  constructor(props) {
    super(props, t('pages.admin.title.dashboard'));
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.admin.message.dashboard')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <Section title="Manage Gardens">
            <GardenModule />
          </Section>
          <Section title="Manage Stations">
            <StationModule />
          </Section>
        </SectionBody>
      </Section>
    );
  }
}
