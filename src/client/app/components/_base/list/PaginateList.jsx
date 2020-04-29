/* eslint-disable class-methods-use-this */
import ListComponent from './ListComponent';
import { getDefault } from '../../../utils';


export default class extends ListComponent {
  get defaultItemsPerPage() {
    return 8;
  }

  get defaultItemsFirstPage() {
    return 8;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.next, this.prev, this.first, this.goto, this.jumpTo,
      this._handlePageChange
    );
    const superState = this.state || super.state;
    this.state = {
      ...superState,
      page: getDefault(props.page, 0),
      itemsPerPage: getDefault(props.itemsPerPage, this.defaultItemsPerPage),
      itemsFirstPage: getDefault(props.itemsFirstPage, this.defaultItemsFirstPage)
    };
  }

  next() {
    this.setState(prevState => ({
      page: Math.min(prevState.page + 1, Number.MAX_SAFE_INTEGER)
    }), this._handlePageChange);
  }

  prev() {
    this.setState(prevState => ({
      page: Math.max(prevState.page - 1, 0)
    }), this._handlePageChange);
  }

  first() {
    this.setState({ page: 0 }, this._handlePageChange);
  }

  goto(page) {
    this.setState({ page: Math.max(page, 0) }, this._handlePageChange);
  }

  jumpTo(offset) {
    this.setState(prevState => ({
      page: Math.min(Math.max(prevState.page + offset, 0), Number.MAX_SAFE_INTEGER)
    }), this._handlePageChange);
  }

  setItemsPerPage(itemsPerPage) {
    this.setState({ itemsPerPage });
  }

  _handlePageChange() {
    const { page, itemsPerPage, itemsFirstPage } = this.state;
    this.handlePageChange({ page, itemsPerPage, itemsFirstPage });
  }

  // eslint-disable-next-line no-unused-vars
  handlePageChange({ page, itemsPerPage, itemsFirstPage }) {
    this.dispatchEvent(this.Events.change, { page, itemsPerPage, itemsFirstPage });
  }
}
