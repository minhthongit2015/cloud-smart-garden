/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBInput,
  Row, Col
} from 'mdbreact';
import './NewQuote.scss';
import DropUploader from '../../form/inputs/drop-uploader/DropUploader';
import NewPost from '../../blog-base/new-post/NewPost';
import QuoteService from '../../../services/intranet/QuoteService';


export default class extends NewPost {
  get createTitle() {
    return 'Chia sẻ trích dẫn mới';
  }

  get updateTitle() {
    return 'Chỉnh sửa trích dẫn';
  }

  get postButtonLabel() {
    return 'Chia sẻ trích dẫn';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get service() {
    return QuoteService;
  }

  renderBody() {
    const {
      quote, author, sharedBy, previewPhoto, previewVideo, previewAudio
    } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <MDBInput
              label="Trích dẫn"
              name="quote"
              value={quote}
              onChange={this.handleInputChange}
              type="textarea"
              rows="2"
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Tác giả"
              name="author"
              value={author}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Chia sẻ bởi"
              name="sharedBy"
              value={sharedBy}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
          </Col>
          <Col size="12" sm="6">
            <DropUploader
              label="Tải ảnh xem trước"
              name="previewPhoto"
              value={previewPhoto}
              useVideo
              videoName="previewVideo"
              video={previewVideo}
              useAudio
              audioName="previewAudio"
              audio={previewAudio}
              onChange={this.handleInputChange}
              className="px-2 pb-4 pt-1"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
