/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col, MDBInput } from 'mdbreact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import NewBlogPost from '../../../components/blog/new-blog-post/NewBlogPost';
import DropUploader from '../../../components/form/inputs/drop-uploader/DropUploader';
// import Composer from '../../../components/form/inputs/composer/Composer';
import CategoryService from '../../../services/blog/CategoryService';
import GardenService from '../../../services/garden/GardenService';
import { toOptions } from '../../../utils';
import StationService from '../../../services/garden/StationService';

const animatedComponents = makeAnimated();


export default class extends NewBlogPost {
  get createTitle() {
    return 'Thêm khu vực cây mới';
  }

  get updateTitle() {
    return 'Thay đổi thông tin khu vực';
  }

  get postButtonLabel() {
    return 'Tạo khu vực mới';
  }

  get updateButtonLabel() {
    return 'Lưu chỉnh sửa';
  }

  get service() {
    return StationService;
  }

  get defaultCategories() {
    return [CategoryService.categoriesMap.Station.type];
  }

  get formData() {
    const data = super.formData;
    data.garden = this.state.garden && this.state.garden.value;
    return data;
  }

  constructor(props) {
    super(props);
    this.avaiGardens = [];
    this.state = {
      garden: null
    };
  }

  componentDidMount() {
    GardenService.list().then((res) => {
      this.avaiGardens = toOptions(res.data || [], '_id', 'title');
      this.forceUpdate();
    });
  }

  setFormData(station) {
    [station.garden] = toOptions([station.garden], '_id', 'title');
    return super.setFormData(station);
  }

  renderBody() {
    const {
      title, summary, previewPhoto, video, audio,
      garden
    } = this.state;
    const { avaiGardens } = this;

    return (
      <React.Fragment>
        <Row>
          <Col size="12" sm="6">
            <MDBInput
              label="Tên khu vực cây"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              label="Mô tả về khu vực này"
              name="summary"
              value={summary}
              onChange={this.handleInputChange}
              type="textarea"
              rows="2"
              autoComplete="off"
              autofill="off"
            />
            <Select
              placeholder="Vườn"
              name="garden"
              value={garden}
              options={avaiGardens}
              defaultValue={avaiGardens[0]}
              onChange={this.handleSelectChange}
              required
              autoComplete="off"
              autofill="off"
              components={animatedComponents}
            />
          </Col>
          <Col size="12" sm="6">
            <DropUploader
              label="Hình ảnh về khu vực?"
              name="previewPhoto"
              value={previewPhoto}
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
