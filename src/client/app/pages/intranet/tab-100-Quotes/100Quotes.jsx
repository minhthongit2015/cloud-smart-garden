import React from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import superrequest from '../../../utils/superrequest';
import Quote from '../../../components/utils/messages/Quote';
import './100Quotes.scss';
import UserService from '../../../services/user/UserService';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import QuoteService from '../../../services/intranet/QuoteService';
import BaseComponent from '../../../components/_base/BaseComponent';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    UserService.useUserState(this);
  }

  refresh() {
    this.fetch();
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    QuoteService.list().then((res) => {
      this.setState({
        quotes: res.data
      });
      this.dispatchEvent(this.Events.loaded, res.data);
    });
  }

  handleDeleteQuote(event, quote) {
    if (!window.confirm('Bạn có chắc chắn muốn xóa trích dẫn này?')) {
      return;
    }
    QuoteService.delete(quote._id)
      .then(() => {
        this.refresh();
        this.dispatchEvent(this.Events.deleted, quote);
      });
  }

  handleEditQuote(event, quote) {
    this.dispatchEvent(this.Events.edit, quote);
  }

  render() {
    const { quotes } = this.state;
    const isShowActions = UserService.isModOrAdmin;

    return (
      <div className="z100-quotes my-4">
        {quotes.map(quote => (
          <MDBRow key={quote._id} center className="mb-3">
            <MDBCol md="12" lg="10" className="z100-quotes__row d-flex flex-column">
              <Quote quote={quote} />
              {isShowActions && (
                <div className="z100-quotes__row__actions">
                  <MDBBtn
                    color="none"
                    className="circle-button light-button"
                    onClick={event => this.handleDeleteQuote(event, quote)}
                  >
                    <i className="fas fa-times" />
                  </MDBBtn>
                  <MDBBtn
                    color="none"
                    className="circle-button light-button"
                    onClick={event => this.handleEditQuote(event, quote)}
                  >
                    <i className="fas fa-pencil-alt" />
                  </MDBBtn>
                </div>
              )}
            </MDBCol>
          </MDBRow>
        ))}
      </div>
    );
  }
}
