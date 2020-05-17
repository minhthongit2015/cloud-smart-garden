/* eslint-disable class-methods-use-this */
import React from 'react';
import { StoreMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './FarmMarker.scss';

import { FarmSrc as FarmIconSrc } from '../../../../../assets/icons';
import { FarmImgSrc } from '../../../../../assets/images';
import MarkerLink from '../../../../components/map-tools/marker-link/MarkerLink';


export default class FarmMarker extends StoreMarker {
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

  renderParent() {
    const { parent } = this.place;
    return (
      parent && (
        <div>
          Được chăm sóc bởi: <b><MarkerLink place={parent}>{parent.title}</MarkerLink></b>
        </div>
      )
    );
  }

  renderBody() {
    return (
      <>
        {this.renderParent()}
        {super.renderBody()}
      </>
    );
  }
}
