/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import DropUploader from '../../../../components/utils/drop-uploader/DropUploader';
// import Composer from '../../../../components/utils/composer/Composer';
import NewBlogPost from '../../../../components/blog/new-blog-post/NewBlogPost';
import t from '../../../../languages';
import ApiEndpoints from '../../../../utils/ApiEndpoints';


export default class extends NewBlogPost {
  get createTitle() {
    return t('pages.aiCloud.tabs.trainedModels.newForm.createTitle');
  }

  get updateTitle() {
    return t('pages.aiCloud.tabs.trainedModels.newForm.updateTitle');
  }

  get postButtonLabel() {
    return t('pages.aiCloud.tabs.trainedModels.newForm.postButton');
  }

  get updateButtonLabel() {
    return t('pages.aiCloud.tabs.trainedModels.newForm.updateButton');
  }

  get postType() {
    return this.props.type || 'TrainedModel';
  }

  get action() {
    return ApiEndpoints.trainedModels;
  }

  validate() {
    return true;
  }

  get formData() {
    const formData = super.formData;
    formData.experiment = formData.experiment && formData.experiment._id;
    formData.target = formData.target && formData.target.key;
    return formData;
  }

  renderBody() {
    const {
      title, summary, preview, video, experiment, target
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
            <MDBInput
              label="Experiment"
              name="experiment"
              value={experiment && (experiment.title || experiment)}
              // onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
              readOnly
              disabled
            />
            <MDBInput
              label="Target"
              name="target"
              value={target && (target.name || target)}
              // onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
              readOnly
              disabled
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
        {/* <Composer ref={this.contentRef} /> */}
      </React.Fragment>
    );
  }
}
