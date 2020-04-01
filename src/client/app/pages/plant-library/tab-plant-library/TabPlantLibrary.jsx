import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import StandalonePage from '../../_base/StandalonePage';
import Video from '../../../components/utils/video/Video';
import MainQuote from '../../../components/utils/messages/MainQuote';
import PlantModule from './PlantModule';


export default class extends StandalonePage {
  constructor(props) {
    super(props, t('pages.plantLibrary.title.plantLibrary'));
    this.setBackground('https://unsplash.com/photos/7VPFyhB_j8Y/download');
    this.mainMessage = {
      quote: `${t('pages.plantLibrary.message.plantLibrary')} 🥳`
    };
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <MainQuote quote={this.mainMessage} />
        </SectionHeader>
        <SectionBody>
          <PlantModule />
        </SectionBody>
      </Section>
    );
  }
}
