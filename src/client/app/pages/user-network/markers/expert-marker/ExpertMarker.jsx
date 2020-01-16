/* eslint-disable class-methods-use-this */
import { ProfileMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './ExpertMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../../assets/icons';
import { FarmSrc as FarmImageSrc } from '../../../../../assets/images';


export default class ExpertMarker extends ProfileMarker {
  get customClass() {
    return MarkerTypes.expert;
  }

  get markerIcon() {
    return FarmIconSrc;
  }

  get defaultCoverImage() {
    return FarmImageSrc;
  }

  get title() {
    const { place: { name } = {} } = this.props;
    return `Chuyên Gia ❝${name}❞`;
  }
}
