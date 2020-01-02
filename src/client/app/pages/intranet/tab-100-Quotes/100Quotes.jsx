import React from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import superrequest from '../../../utils/superrequest';
import Quote from '../../../components/utils/messages/Quote';
import './100Quotes.scss';
import UserService from '../../../services/user/UserService';
import ApiEndpoints from '../../../utils/ApiEndpoints';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quotes: []
    };
    UserService.useUserState(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    superrequest.get(ApiEndpoints.oneHundredQuotes).then((res) => {
      if (!res || !res.ok) {
        return;
      }
      this.setState({
        quotes: res.data
      });
      this.dispatchOnloadEvent(res.data);
    });
  }

  refresh() {
    this.fetch();
  }

  dispatchOnloadEvent(quotes) {
    if (this.props.onLoad) {
      this.props.onLoad(quotes);
    }
  }

  handleDeleteQuote(event, quote) {
    if (!window.confirm('Bạn có chắc chắn muốn xóa trích dẫn này?')) {
      return;
    }
    superrequest.agentDelete(ApiEndpoints.quoteI(quote._id))
      .then(() => {
        this.refresh();
        if (this.props.onDelete) {
          this.props.onDelete(event, quote);
        }
      });
  }

  handleEditQuote(event, quote) {
    if (this.props.onEdit) {
      this.props.onEdit(event, quote);
    }
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
