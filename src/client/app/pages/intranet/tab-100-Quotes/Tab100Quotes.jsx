import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import AdminPage from '../../_base/AdminPage';
import NewQuote from '../../../components/intranet/new-quote/NewQuote';
import OneHundredQuotes from './100Quotes';
import MainQuote from '../../../components/utils/messages/MainQuote';

const DEFAULT_BACKGROUND = '/images/cup-coffee.jpg';

export default class extends AdminPage {
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

  handleQuotesLoaded(quotes) {
    const background = (quotes && quotes[0] && quotes[0].preview) || DEFAULT_BACKGROUND;
    this.setBackground(background);
    this.setState({
      quoteOfTheDay: quotes && quotes[0]
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleDeleteQuote() {
    // this.oneHundredQuotesRef.current.refresh();
  }

  handleEditQuote(event, quote) {
    this.newQuoteRef.current.setQuote(quote);
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
            onPosted={this.handleQuotePosted}
            hasPermission={canCreateNewPost}
          />
          <OneHundredQuotes
            ref={this.oneHundredQuotesRef}
            onLoad={this.handleQuotesLoaded}
            onEdit={this.handleEditQuote}
            onDelete={this.handleDeleteQuote}
          />
        </SectionBody>
      </Section>
    );
  }
}
