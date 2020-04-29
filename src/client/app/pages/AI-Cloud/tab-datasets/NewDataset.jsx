/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/form/inputs/drop-uploader/DropUploader';
// import Composer from '../../../components/form/inputs/composer/Composer';
import t from '../../../languages';
import DatasetService from '../../../services/AI/DatasetService';


export default class extends NewBlogPost {
  get service() {
    return DatasetService;
  }

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

  get formData() {
    const { days } = this.state;
    const newDataset = { ...super.formData, days };
    delete newDataset.records;
    return newDataset;
  }

  renderBody() {
    const {
      title, summary, previewPhoto, previewVideo, previewAudio, days
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
              name="previewPhoto"
              value={previewPhoto}
              video={previewVideo}
              useAudio
              audio={previewAudio}
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
