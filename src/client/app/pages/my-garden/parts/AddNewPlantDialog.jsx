/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBInput, Col, Row, MDBTable, MDBTableBody, MDBBtn
} from 'mdbreact';
import Select from 'react-select';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import BaseDialog from '../../../components/dialogs/BaseDialog';
import PlantService from '../../../services/garden/PlantService';
import FixedRatioImage from '../../../components/utils/fixed-ratio-image/FixedRatioImage';
import UserPlantService from '../../../services/garden/UserPlantService';


export default class extends BaseDialog {
  get wavesHeader() {
    return true;
  }

  get title() {
    return 'Thêm Cây Trồng Mới';
  }

  constructor(props) {
    super(props);
    this.bind(this.handleSubmit);
    this.state = {
      ...this.state,
      plants: [],
      plant: null,
      station: null,
      startDate: moment().format('YYYY-MM-DD')
    };
  }

  show(station, newPlantAddedHandler) {
    this.handleNewPlantAdded = newPlantAddedHandler;
    this.setState({
      station,
      startDate: moment().format('YYYY-MM-DD')
    }, this.open);
  }

  componentDidMount() {
    PlantService.list().then((res) => {
      const plants = this.resolvePlants(res.data);
      this.setState({
        plants,
        plant: plants[0],
        title: plants[0].title,
        name: null
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  resolvePlants(plants) {
    return plants.map(plant => ({
      label: plant.title,
      value: plant
    }));
  }

  handleSubmit(event) {
    this.stopEvent(event);
    const { station, plant, name } = this.state;
    const { _id, title } = (plant && plant.value) || {};
    const plantName = name != null ? name : title;
    this.disable();
    UserPlantService.addUserPlant(station._id, _id, plantName)
      .then((rs) => {
        this.handleNewPlantAdded(rs.data);
        this.enable();
        this.close();
      });
  }

  // eslint-disable-next-line class-methods-use-this
  renderPlantInfo(plant) {
    const { summary, content } = (plant && plant.value) || {};

    return plant && (
      <React.Fragment>
        <div>Thông Tin</div>
        <MDBTable hover>
          <MDBTableBody>
            <tr>
              <td>Giới thiệu</td>
              <td>{summary}</td>
            </tr>
            <tr>
              <td>Chi tiết</td>
              <td>
                <ReactMarkdown
                  className="markdown"
                  source={content}
                  escapeHtml={false}
                />
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </React.Fragment>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const {
      plants, plant, name, startDate
    } = this.state;
    const {
      title, previewPhoto
    } = (plant && plant.value) || {};
    const plantName = name != null ? name : title;

    return (
      <form className="p-3" onSubmit={this.handleSubmit}>
        <Row>
          <Col size="4">
            <Select
              options={plants}
              placeholder="Loài cây"
              name="plant"
              value={plant}
              onChange={this.handleSelectChange}
              className="mb-2"
            />
            <FixedRatioImage src={previewPhoto} ratio={7 / 4} frame="rounded" />
          </Col>
          <Col size="8">
            {this.renderPlantInfo(plant)}
            <MDBInput
              name="name"
              value={plantName}
              onChange={this.handleInputChange}
              label="Đặt tên"
              autoComplete="off"
              autofill="off"
              required
            />
            <MDBInput
              name="startDate"
              label="Ngày trồng"
              value={startDate}
              onChange={this.handleInputChange}
              type="date"
              autoComplete="off"
              autofill="off"
              required
            />
            <div className="text-center">
              <MDBBtn
                gradient="peach"
                type="submit"
                className="px-3 py-2"
              >Bắt Đầu Trồng
              </MDBBtn>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}
