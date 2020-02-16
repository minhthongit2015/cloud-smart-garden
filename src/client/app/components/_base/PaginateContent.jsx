/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';


class PaginateContent extends BaseComponent {
  get page() {
    return this.state && this.state.page;
  }

  get itemsPerPage() {
    return this.state && this.state.itemsPerPage;
  }

  get defaultItemsPerPage() {
    return 8;
  }

  constructor(props) {
    super(props);
    this.bind(this._handlePageChange);
    this.state = {
      page: 0,
      itemsPerPage: this.defaultItemsPerPage
    };
  }

  nextPage() {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.handlePageChange);
  }

  prevPage() {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.handlePageChange);
  }

  _handlePageChange() {
    const { page, itemsPerPage } = this.state;
    this.handlePageChange(page, itemsPerPage);
  }

  // eslint-disable-next-line no-unused-vars
  handlePageChange(page, itemsPerPage) {

  }
}

export default PaginateContent;
