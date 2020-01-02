/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/utils/drop-uploader/DropUploader';
// import Composer from '../../../components/utils/composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';


export default class extends NewBlogPost {
  get createTitle() {
    return 'Mở một khu vườn mới';
  }

  get updateTitle() {
    return 'Thay đổi thông tin khu vườn';
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
      title, summary, preview, video, audio
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
              label="Đây sẽ là một khu vườn như thế nào?"
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
              label="Bạn có muốn chia sẻ hình ảnh về khu vườn của bạn?"
              name="preview"
              value={preview}
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
