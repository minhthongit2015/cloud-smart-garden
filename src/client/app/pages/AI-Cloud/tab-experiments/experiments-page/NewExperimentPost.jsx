/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import DropUploader from '../../../../components/form/inputs/drop-uploader/DropUploader';
import Composer from '../../../../components/form/inputs/composer/Composer';
import NewBlogPost from '../../../../components/blog/new-blog-post/NewBlogPost';
import t from '../../../../languages';


export default class extends NewBlogPost {
  get createTitle() {
    return t('pages.aiCloud.tabs.experiments.newForm.createTitle');
  }

  get updateTitle() {
    return t('pages.aiCloud.tabs.experiments.newForm.updateTitle');
  }

  get postButtonLabel() {
    return t('pages.aiCloud.tabs.experiments.newForm.postButton');
  }

  get updateButtonLabel() {
    return t('pages.aiCloud.tabs.experiments.newForm.updateButton');
  }

  get postType() {
    return this.props.type || 'Experiment';
  }

  get excludeKeys() {
    return ['categories', ...super.excludeKeys];
  }

  validate() {
    return true;
  }

  renderBody() {
    const {
      title, summary, previewPhoto, video
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
              name="previewPhoto"
              value={previewPhoto}
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
