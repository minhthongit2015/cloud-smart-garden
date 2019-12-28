/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import NewPost from '../../blog-base/new-post/NewPost';
import CategoryService from '../../../services/blog/CategoryService';
import DropUploader from '../../utils/drop-uploader/DropUploader';
import Composer from '../../utils/composer/Composer';
import UserService from '../../../services/user/UserService';
import MessageDialogHelper from '../../../helpers/dialogs/MessageDialogHelper';
import { IconCommunity } from '../../../../assets/icons';
import t from '../../../languages';
import ApiEndpoints from '../../../utils/ApiEndpoints';

const animatedComponents = makeAnimated();


export default class extends NewPost {
  get postType() {
    return this.props.type || 'BlogPost';
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultCategories() {
    return undefined;
  }

  get excludeKeys() {
    const excludeKeys = super.excludeKeys;
    if (this.defaultCategories) {
      return excludeKeys.concat('categories');
    }
    return excludeKeys;
  }

  get formData() {
    const formData = super.formData;
    formData.categories = this.defaultCategories
      || (formData.categories && formData.categories.map(cate => cate.value));
    formData.content = this.contentRef.current && this.contentRef.current.value;
    return formData;
  }

  get action() {
    return ApiEndpoints.posts;
  }

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);

    CategoryService.useCategoriesState(this);
  }

  async resetAndClose() {
    if (this.contentRef.current) {
      this.contentRef.current.value = '';
    }
    return super.resetAndClose();
  }

  async reset(extraStates) {
    if (this.contentRef.current) {
      this.contentRef.current.value = '';
    }
    return super.reset(extraStates);
  }

  handleCategoriesChange(value) {
    this.setState({
      categories: value
    });
  }

  setPost(post) {
    const postCategories = post.categories.map(cat => cat.type);
    const categories = CategoryService.getCategoriesAsOptions()
      .filter(cat => postCategories.includes(cat.value));

    if (this.contentRef.current) {
      this.contentRef.current.value = post.content;
    }
    this.setFormData({
      _id: post._id,
      title: post.title,
      summary: post.summary,
      preview: post.preview,
      video: post.video,
      audio: post.audio
    }).then(() => {
      this.setState({
        categories
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
      title, summary, categories, preview, video, audio
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
              video={video}
              audio={audio}
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
