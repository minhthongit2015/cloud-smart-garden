/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/utils/drop-uploader/DropUploader';
import Composer from '../../../components/utils/composer/Composer';


export default class extends NewBlogPost {
  get createTitle() {
    return 'Thêm loài cây mới';
  }

  get updateTitle() {
    return 'Cập nhập thông tin loài cây';
  }

  get postButtonLabel() {
    return 'Tạo loài cây';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get defaultCategories() {
    return ['Plant'];
  }

  renderBody() {
    const {
      title, summary, previewPhoto, video, audio
    } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <MDBInput
              label="🌱 Tên loài cây"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Giới thiệu"
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
              label="Hình ảnh loài cây"
              name="previewPhoto"
              value={previewPhoto}
              video={video}
              useAudio
              audio={audio}
              onChange={this.handleInputChange}
              className="px-2 pb-4 pt-1"
            />
          </Col>
        </Row>
        <Composer ref={this.contentRef} placeholder="Mô tả chi tiết loài cây" />
      </React.Fragment>
    );
  }
}
