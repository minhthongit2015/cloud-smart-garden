import React from 'react';
import BasePage from './BasePage';
import { Section, SectionHeader, SectionBody } from '../../layouts/base/section';
import DeepMessage from '../../components/utils/messages/DeepMessage';
import GuideMessage from '../../components/utils/messages/GuideMessage';


export default class extends BasePage {
  constructor(props, title) {
    super(props, title || props.title);
  }

  setMainMessage(mainMessage) {
    this.mainMessage = mainMessage;
    return this;
  }

  setGuideMessage(guideMessage) {
    this.guideMessage = guideMessage;
    return this;
  }

  renderHeader() {
    return (
      <React.Fragment>
        {this.mainMessage && <DeepMessage>{this.mainMessage}</DeepMessage>}
        {this.guideMessage && <GuideMessage>{this.guideMessage}</GuideMessage>}
      </React.Fragment>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    return null;
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          {this.renderHeader()}
        </SectionHeader>
        <SectionBody>
          {this.renderBody()}
        </SectionBody>
      </Section>
    );
  }
}
