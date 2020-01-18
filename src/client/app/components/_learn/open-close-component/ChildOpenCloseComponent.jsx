import OpenCloseComponent from './OpenCloseComponent';


export default class ChildOpenCloseComponent extends OpenCloseComponent {
  get author() {
    return this.props.author || this.props.childAuthor || super.author;
  }

  getContent(author) {
    return (this.props.contentProvider && this.props.contentProvider(author))
      || this.props.children;
  }

  renderMessage(author) {
    return (this.props.renderMessage && this.props.renderMessage(author))
      || `"An message from ${author}."`;
  }
}
