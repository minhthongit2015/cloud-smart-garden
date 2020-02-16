/* eslint-disable class-methods-use-this */
import superrequest from '../../utils/superrequest';
import PaginateContent from './PaginateContent';


class DynamicContent extends PaginateContent {
  get dataEndpoint() {
    return '';
  }

  constructor(props) {
    super(props);
    this.bind(this.handleFetchedData, this.handleFetchError);
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    return superrequest.get(this.dataEndpoint)
      .catch(this.handleFetchError)
      .then(this.handleFetchedData);
  }

  handleFetchedData() {

  }

  handleFetchError() {

  }

  handlePageChange() {
    this.fetchData();
  }
}

export default DynamicContent;
