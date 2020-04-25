/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn, Table } from 'mdbreact';
import { ProfileMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './ExpertMarker.scss';
import { ExpertLvl1Src } from '../../../../../assets/icons';
import { FarmImgSrc } from '../../../../../assets/images';


export default class ExpertMarker extends ProfileMarker {
  get customClass() {
    return MarkerTypes.expert;
  }

  get placeTypeTitle() {
    return 'chuyên gia thực vật học';
  }

  get markerIcon() {
    return ExpertLvl1Src;
  }

  get defaultCoverImage() {
    return FarmImgSrc;
  }

  get title() {
    const { place: { title } = {} } = this.props;
    return `Chuyên Gia ❝${title}❞`;
  }

  renderProfile() {
    return (
      <React.Fragment>
        <div className="text-center pt-3 pb-2">
          <h5 className="text-warning">Đánh Giá: 4.5</h5>
          <span className="text-nowrap text-warning">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
          </span>
        </div>
        <div className="text-center pt-2">
          <Table hover small>
            <tbody>
              <tr>
                <td>Vui vẻ, thân thiện</td>
                <td>4.9</td>
              </tr>
              <tr>
                <td>Khả năng giải quyết</td>
                <td>4.1</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="text-center py-3">
          <MDBBtn color="primary">
            <i className="fas fa-headset" /> Gọi nhờ hỗ trợ
          </MDBBtn>
        </div>
      </React.Fragment>
    );
  }
}
