import React from 'react';
import BaseComponent from '../../BaseComponent';

/**
 * Thiết kế `Component` để tiện cho việc mở rộng và không phải chỉnh sửa component gốc.
 */
export default class OpenCloseComponent extends BaseComponent {
  // Cách 1
  get author() {
    return this.props.author || '';
  }

  // Cách 2 (để lấy thuộc tính thông thường)
  getContent(author) {
    return (this.props.contentProvider && this.props.contentProvider(author))
      || this.props.children;
  }

  // Cách 2 (trong trường hợp dùng với render)
  // (Hoạt động giống như `getContent` ở trên, chỉ khác mục đích thôi.)
  renderMessage(author) {
    return (this.props.renderMessage && this.props.renderMessage(author))
      || `"An message from ${author}."`;
  }

  render() {
    return (
      <div>
        <div>Hello {this.author}</div>
        <div>{this.renderMessage(this.author)}</div>
      </div>
    );
  }
}
