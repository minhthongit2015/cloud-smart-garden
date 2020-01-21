/* eslint-disable class-methods-use-this */
// import React from 'react';
import { PageMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './GardenMarker.scss';

import { GardenSrc } from '../../../../../assets/icons';
import { GardenImgSrc } from '../../../../../assets/images';

export default class GardenMarker extends PageMarker {
  get customClass() {
    return MarkerTypes.garden;
  }

  get markerIcon() {
    return GardenSrc;
  }

  get defaultCoverImage() {
    return GardenImgSrc;
  }

  get placeTypeTitle() {
    return 'vườn gia đình';
  }

  get title() {
    const { place: { name } = {} } = this.props;
    return (
      `❝${name || 'Chưa Đặt Tên'}❞`
    );
  }
}
