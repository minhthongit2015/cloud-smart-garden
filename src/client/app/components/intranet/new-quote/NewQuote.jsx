/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBInput,
  Row, Col
} from 'mdbreact';
import './NewQuote.scss';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import CategoryService from '../../../services/blog/CategoryService';
import MessageDialogHelper from '../../../helpers/dialogs/MessageDialogHelper';
import { IconCommunity } from '../../../../assets/icons';
import t from '../../../languages';
import NewForm from '../../utils/new-form/NewForm';


export default class extends NewForm {
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

  get action() {
    return '/api/v1/intranet/100-Quotes';
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      _id: null,
      quote: '',
      author: '',
      sharedBy: '',
      preview: '',
      video: '',
      audio: ''
    };

    CategoryService.useCategoriesState(this);
  }

  setQuote(quote) {
    this.setFormData({
      _id: quote._id,
      quote: quote.quote,
      author: quote.author,
      sharedBy: quote.sharedBy,
      preview: quote.preview,
      video: quote.video,
      audio: quote.audio
    });
  }

  handleMissingPermission() {
    MessageDialogHelper.show(
      'Tham Gia Viết Bài',
      <div>
        Để tham gia cùng viết bài, bạn có thể liên hệ qua Facebook page <a href="https://www.facebook.com/Climate-Strike-Vietnam-101448167939446" target="_blank" rel="noopener noreferrer">Climate Strike Vietnam</a>. Hoặc đăng bài ở chuyên mục <IconCommunity text={t('pages.earthPicture.nav.communityShare')} />.
      </div>
    );
  }

  renderBody() {
    const {
      quote, author, sharedBy, preview, video, audio
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
              name="preview"
              value={preview}
              videoName="video"
              video={video}
              useAudio
              audioName="audio"
              audio={audio}
              onChange={this.handleInputChange}
              className="px-2 pb-4 pt-1"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
