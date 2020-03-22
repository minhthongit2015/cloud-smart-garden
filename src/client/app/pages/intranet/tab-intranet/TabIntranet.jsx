import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import StandalonePage from '../../_base/StandalonePage';
import Video from '../../../components/utils/video/Video';
import MainQuote from '../../../components/utils/messages/MainQuote';


export default class extends StandalonePage {
  constructor(props) {
    super(props, t('pages.intranet.title.intranet'));
    this.setBackground('/images/tomorrowland.jpg');
    this.mainMessage = {
      quote: `${t('pages.intranet.message.intranet')} 🥳`
    };
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <MainQuote quote={this.mainMessage} />
        </SectionHeader>
        <SectionBody>
          <Video title="" src="https://www.youtube.com/watch?v=w7IcUg23mtM" loop />
        </SectionBody>
      </Section>
    );
  }
}
