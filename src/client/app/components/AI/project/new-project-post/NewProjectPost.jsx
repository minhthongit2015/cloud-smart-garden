/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CategoryService from '../../../../services/blog/CategoryService';
import DropUploader from '../../../utils/drop-uploader/DropUploader';
import Composer from '../../../utils/composer/Composer';
import MessageDialogHelper from '../../../../helpers/dialogs/MessageDialogHelper';
import { IconCommunity } from '../../../../../assets/icons';
import t from '../../../../languages';
import NewBlogPost from '../../../blog/new-blog-post/NewBlogPost';

const animatedComponents = makeAnimated();


export default class extends NewBlogPost {
  get createTitle() {
    return 'Bắt đầu dự án mới';
  }

  get updateTitle() {
    return 'Cập nhập thông tin dự án';
  }

  get postButtonLabel() {
    return 'Tạo dự án';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get excludeKeys() {
    return ['categories', ...super.excludeKeys];
  }

  get formData() {
    const formData = super.formData;
    formData.categories = [CategoryService.categoriesMap.Project];
    return formData;
  }

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);

    this.state = {
      ...this.state,
      _id: null,
      title: '',
      summary: '',
      preview: '',
      video: '',
      categories: []
    };

    CategoryService.useCategoriesState(this);
  }


  setPost(post) {
    const postCategories = post.categories.map(cat => cat.type);
    const categories = CategoryService.getCategoriesAsOptions()
      .filter(cat => postCategories.includes(cat.value));

    this.contentRef.current.value = post.content;
    this.setFormData({
      _id: post._id,
      title: post.title,
      summary: post.summary,
      preview: post.preview,
      video: post.video
    }).then(() => {
      this.setState({
        categories
      });
    });
  }

  async validate() {
    return true;
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
      title, summary, preview, video, categories
    } = this.state;
    const { categories: categoryOptionKeys } = this.props;
    const categoryOptions = CategoryService.getCategoriesAsOptions(categoryOptionKeys);

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <Select
              placeholder="Chuyên mục"
              name="categories"
              options={categoryOptions}
              isMulti
              value={categories}
              // defaultValue={categoryOptions[0]}
              onChange={this.handleCategoriesChange}
              required
              autoComplete="off"
              autofill="off"
              components={animatedComponents}
              disabled
            />
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
              name="preview"
              value={preview}
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
