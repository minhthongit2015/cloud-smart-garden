import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import StandalonePage from '../../_base/StandalonePage';
import NewQuote from '../../../components/intranet/new-quote/NewQuote';
import OneHundredQuotes from './100Quotes';
import MainQuote from '../../../components/utils/messages/MainQuote';
import Random from '../../../../../server/utils/random';

const DEFAULT_BACKGROUND = '/images/cup-coffee.jpg';

export default class extends StandalonePage {
  // eslint-disable-next-line class-methods-use-this
  get defaultQuote() {
    return {
      quote: t('pages.intranet.message.oneHundredQuotes')
    };
  }

  constructor(props) {
    super(props, t('pages.intranet.title.oneHundredQuotes'));
    this.setBackground();
    this.newQuoteRef = React.createRef();
    this.oneHundredQuotesRef = React.createRef();
    this.handleQuotePosted = this.handleQuotePosted.bind(this);
    this.handleQuotesLoaded = this.handleQuotesLoaded.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
    this.handleEditQuote = this.handleEditQuote.bind(this);

    this.state = {
      quoteOfTheDay: null,
      canCreateNewPost: true
    };
  }

  handleQuotePosted() {
    this.oneHundredQuotesRef.current.refresh();
  }

  handleQuotesLoaded(event, quotes) {
    const quoteOfTheDay = quotes && Random.random(quotes);
    const background = (quoteOfTheDay && quoteOfTheDay.previewPhoto) || DEFAULT_BACKGROUND;
    this.setBackground(background);
    this.setState({
      quoteOfTheDay
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleDeleteQuote() {
    // this.oneHundredQuotesRef.current.refresh();
  }

  handleEditQuote(event, quote) {
    this.newQuoteRef.current.setFormData(quote);
  }

  render() {
    const { canCreateNewPost, quoteOfTheDay } = this.state;
    return (
      <Section>
        <SectionHeader>
          {quoteOfTheDay ? (
            <MainQuote quote={quoteOfTheDay} />
          ) : (
            <MainQuote quote={this.defaultQuote} />
          )}
        </SectionHeader>
        <SectionBody>
          <NewQuote
            ref={this.newQuoteRef}
            onSubmited={this.handleQuotePosted}
            hasPermission={canCreateNewPost}
          />
          <OneHundredQuotes
            ref={this.oneHundredQuotesRef}
            onLoaded={this.handleQuotesLoaded}
            onEdit={this.handleEditQuote}
            onDeleted={this.handleDeleteQuote}
          />
        </SectionBody>
      </Section>
    );
  }
}
