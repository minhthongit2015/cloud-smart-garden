/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/utils/drop-uploader/DropUploader';
// import Composer from '../../../components/utils/composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';


export default class extends NewBlogPost {
  get createTitle() {
    return 'Thêm khu vực cây mới';
  }

  get updateTitle() {
    return 'Thay đổi thông tin khu vực';
  }

  get postButtonLabel() {
    return 'Tạo khu vực mới';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get defaultCategories() {
    return [CategoryService.categoriesMap.Station.type];
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
              label="Tên khu vực cây"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Mô tả về khu vực này"
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
              label="Hình ảnh về khu vực?"
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
