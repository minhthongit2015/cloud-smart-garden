/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/form/inputs/drop-uploader/DropUploader';
// import Composer from '../../../components/form/inputs/composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';


export default class extends NewBlogPost {
  get createTitle() {
    return 'Thêm một khu vườn mới';
  }

  get updateTitle() {
    return 'Thay đổi thông tin vườn';
  }

  get postButtonLabel() {
    return 'Tạo khu vườn';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get defaultCategories() {
    return [CategoryService.categoriesMap.Garden.type];
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
              label="🌱 Đặt tên cho khu vườn"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Giới thiệu khu vườn"
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
              label="Chia sẻ hình ảnh về khu vườn của bạn"
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
        {/* <Composer ref={this.contentRef} placeholder="123" /> */}
      </React.Fragment>
    );
  }
}
