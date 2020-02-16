/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/utils/drop-uploader/DropUploader';
// import Composer from '../../../components/utils/composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import t from '../../../languages';


export default class extends NewBlogPost {
  get createTitle() {
    return t('pages.aiCloud.tabs.datasets.newForm.createTitle');
  }

  get updateTitle() {
    return t('pages.aiCloud.tabs.datasets.newForm.updateTitle');
  }

  get postButtonLabel() {
    return t('pages.aiCloud.tabs.datasets.newForm.postButton');
  }

  get updateButtonLabel() {
    return t('pages.aiCloud.tabs.datasets.newForm.updateButton');
  }

  get defaultCategories() {
    return [CategoryService.categoriesMap.Dataset.type];
  }

  get formData() {
    const { days } = this.state;
    const newDataset = { ...super.formData, days };
    delete newDataset.records;
    return newDataset;
  }

  get action() {
    return ApiEndpoints.datasets;
  }

  renderBody() {
    const {
      title, summary, preview, video, audio, days
    } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <MDBInput
              label="Tên bộ dữ liệu"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Mô tả"
              name="summary"
              value={summary}
              onChange={this.handleInputChange}
              type="textarea"
              rows="2"
              autoComplete="off"
              autofill="off"
            />
            {days && (
              <div>
                {days.map(day => <div className="p-2">{day}</div>)}
              </div>
            )}
          </Col>
          <Col size="12" sm="6">
            <DropUploader
              label="Hình ảnh từ quá trình chăm sóc?"
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
