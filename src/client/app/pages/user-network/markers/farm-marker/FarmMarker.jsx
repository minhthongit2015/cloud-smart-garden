/* eslint-disable class-methods-use-this */
import { PageMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './FarmMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../../assets/icons';
import { FarmImgSrc } from '../../../../../assets/images';


export default class FarmMarker extends PageMarker {
  get customClass() {
    return MarkerTypes.farm;
  }

  get markerIcon() {
    return FarmIconSrc;
  }

  get defaultCoverImage() {
    return FarmImgSrc;
  }

  get placeTypeTitle() {
    return 'nông trại xanh';
  }

  get title() {
    const {
      place: {
        name
      } = {}
    } = this.props;
    return `❝${name || 'Chưa Đặt Tên'}❞`;
  }
}
