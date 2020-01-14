/* eslint-disable class-methods-use-this */
import { PageMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './GardenMarker.scss';

import { PlantPot1Src } from '../../../../../assets/icons';
import { GardenSrc } from '../../../../../assets/images';

export default class GardenMarker extends PageMarker {
  get customClass() {
    return MarkerTypes.garden;
  }

  get markerIcon() {
    return PlantPot1Src;
  }

  get defaultCoverImage() {
    return GardenSrc;
  }

  get title() {
    const { place: { name } = {} } = this.props;
    return `Vườn Gia Đình ❝${name || 'Chưa Đặt Tên'}❞`;
  }
}
