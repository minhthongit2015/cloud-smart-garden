/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import DropUploader from '../../../utils/drop-uploader/DropUploader';
import Composer from '../../../utils/composer/Composer';
import NewBlogPost from '../../../blog/new-blog-post/NewBlogPost';


export default class extends NewBlogPost {
  get createTitle() {
    return 'Thử nghiệm chế độ chăm sóc mới';
  }

  get updateTitle() {
    return 'Cập nhập thông tin chế độ chăm sóc';
  }

  get postButtonLabel() {
    return 'Tạo chế độ mới';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get postType() {
    return this.props.type || 'Experiment';
  }

  validate() {
    return true;
  }

  renderBody() {
    const {
      title, summary, preview, video
    } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <MDBInput
              label="Tiêu đề"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Mô tả ngắn gọn"
              name="summary"
              value={summary}
              onChange={this.handleInputChange}
              type="textarea"
              rows="2"
              autoComplete="off"
              autofill="off"
            />
          </Col>
          <Col size="12" sm="6">
            <DropUploader
              label="Tải ảnh xem trước"
              name="preview"
              value={preview}
              videoName="video"
              video={video}
              onChange={this.handleInputChange}
              className="px-2 pb-4 pt-1"
            />
          </Col>
        </Row>
        <Composer ref={this.contentRef} />
      </React.Fragment>
    );
  }
}
