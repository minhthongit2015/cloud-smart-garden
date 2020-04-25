/* eslint-disable class-methods-use-this */
import PaginateList from './PaginateList';
import CRUDService from '../../services/CRUDService';
import { appendUpdateArray } from '../../utils';


export default class extends PaginateList {
  get service() {
    return CRUDService;
  }

  get model() {
    return this.props.model || this.service.model;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.handleFetchedItems,
      this.handleFetchFromBeginning,
      this.handleFetchError,
      this.handlePageChange
    );
    const superState = this.state || super.state;
    this.state = {
      ...superState,
      hasMore: true
    };
  }

  componentDidMount() {
    this.fetchFromBeginning();
  }

  componentWillUnmount() {
    clearTimeout(this.retryTimeout);
  }

  fetchFromBeginning() {
    const { page, itemsPerPage, itemsFirstPage } = this.state;
    const totalItems = Math.max(page * itemsPerPage + itemsFirstPage, 0);
    return this.service.list({
      model: this.model,
      limit: totalItems,
      offset: 0
    })
      .catch(this.handleFetchError)
      .then(this.handleFetchFromBeginning);
  }

  handleFetchFromBeginning(res) {
    const items = this.resolveFetchedData(res.data);
    const { page, itemsPerPage, itemsFirstPage } = this.state;
    const totalItems = Math.max(page * itemsPerPage + itemsFirstPage, 0);
    this.setState(prevState => ({
      items: this.updateItems(prevState.items, items),
      hasMore: items.length >= totalItems
    }));
  }

  // Fetch current page
  fetchCurrentPage() {
    const { page, itemsPerPage, itemsFirstPage } = this.state;
    return this.service.list({
      model: this.model,
      limit: Math.max(page ? itemsPerPage : itemsFirstPage, 0),
      offset: Math.max((page - 1) * itemsPerPage + itemsFirstPage, 0)
    })
      .catch(this.handleFetchError)
      .then(this.handleFetchedItems);
  }

  handleFetchedItems(res) {
    const items = this.resolveFetchedData(res.data);
    this.setState(prevState => ({
      items: this.updateItems(prevState.items, items),
      hasMore: items.length >= prevState.itemsPerPage
    }));
  }

  resolveFetchedData(items) {
    return items;
  }

  updateItems(oldItems, newItems) {
    return appendUpdateArray(oldItems, newItems);
  }

  handleFetchError(error) {
    console.error(error);
    this.retryTimeout = setTimeout(() => {
      this.fetchFromBeginning();
    }, 2000);
  }

  // eslint-disable-next-line no-unused-vars
  handlePageChange({ page, itemsPerPage, itemsFirstPage }) {
    this.fetchCurrentPage();
  }
}
