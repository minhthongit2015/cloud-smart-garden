/* eslint-disable class-methods-use-this */
import { StoreMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './FoodStoreMarker.scss';

import { FoodStoreSrc } from '../../../../../assets/icons';
import { FoodStoreImgSrc } from '../../../../../assets/images';

export default class FoodStoreMarker extends StoreMarker {
  get customClass() {
    return MarkerTypes.foodStore;
  }

  get markerIcon() {
    return FoodStoreSrc;
  }

  get defaultCoverImage() {
    return FoodStoreImgSrc;
  }

  get placeTypeTitle() {
    return 'cửa hàng rau củ';
  }
}
