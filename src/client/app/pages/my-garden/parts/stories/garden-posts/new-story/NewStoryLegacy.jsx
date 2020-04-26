import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import NewBlogPost from '../../../../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../../../../components/utils/drop-uploader/DropUploader';
import Composer from '../../../../../../components/utils/composer/Composer';
import GardenStoryService from '../../../../../../services/garden/GardenStoryService';


export default class extends NewBlogPost {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return GardenStoryService;
  }

  renderBody() {
    const {
      title, content, previewPhoto, previewVideo
    } = this.state;

    return (
      <>
        <Row>
          <Col size="12" sm="7">
            <DropUploader
              name="previewPhoto"
              value={previewPhoto}
              videoName="previewVideo"
              video={previewVideo}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col>
            <MDBInput
              label="Tiêu đề bài viết"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
            />
            <Composer ref={this.contentRef} value={content} height="200px" />
          </Col>
        </Row>
      </>
    );
  }
}
