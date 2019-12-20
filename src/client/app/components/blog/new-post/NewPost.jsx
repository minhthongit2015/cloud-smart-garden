/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBInput,
  Row, Col
} from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './NewPost.scss';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import Composer from '../composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';
import UserService from '../../../services/user/UserService';
import MessageDialogHelper from '../../../helpers/dialogs/MessageDialogHelper';
import { IconCommunity } from '../../../../assets/icons';
import t from '../../../languages';
import NewForm from '../../utils/new-form/NewForm';


const animatedComponents = makeAnimated();


export default class extends NewForm {
  get formData() {
    const formData = super.formData;
    const content = this.contentRef.current.value;
    const categoryIds = formData.category.map(cate => cate.value);
    return { ...formData, content, categories: categoryIds };
  }

  get action() {
    return '/api/v1/blog/posts';
  }

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

    this.state = {
      ...this.state,
      _id: null,
      title: '',
      summary: '',
      preview: '',
      video: '',
      category: []
    };

    CategoryService.useCategoriesState(this);
  }

  resetAndClose() {
    super.resetAndClose();
    this.contentRef.current.value = '';
  }

  reset() {
    super.reset();
    this.contentRef.current.value = '';
  }

  handleCategoryChange(value) {
    this.setState({
      category: value
    });
  }

  setPost(post) {
    const postCategories = post.categories.map(cat => cat.type);
    const category = CategoryService.getCategoriesAsOptions()
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
        category
      });
    });
  }

  async validate() {
    if (this.formData.categories.length <= 0) {
      alert('Vui lòng chọn "Chuyên mục" cho bài viết');
      return false;
    }
    return true;
  }

  async beforeSubmit() {
    UserService.updateUserSocialPoint(5);
  }

  handleSubmitError() {
    UserService.updateUserSocialPoint(-5);
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
      title, summary, preview, video, category
    } = this.state;
    const { categories, rootCategory } = this.props;
    let categoryOptions = [];
    if (rootCategory) {
      categoryOptions = CategoryService.getLeafCategoriesAsOptions(rootCategory);
    }
    if (categories) {
      categoryOptions = CategoryService.getCategoriesAsOptions(categories);
    }

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <Select
              placeholder="Chuyên mục"
              name="category"
              options={categoryOptions}
              isMulti
              value={category}
              // defaultValue={categoryOptions[0]}
              onChange={this.handleCategoryChange}
              required
              autoComplete="off"
              autofill="off"
              components={animatedComponents}
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
