/* eslint-disable class-methods-use-this */
import { StoreMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './FoodStoreMarker.scss';

import { ShoppingCartSrc } from '../../../../../assets/icons';
import { FoodStoreSrc } from '../../../../../assets/images';

export default class FoodStoreMarker extends StoreMarker {
  get customClass() {
    return MarkerTypes.foodStore;
  }

  get markerIcon() {
    return ShoppingCartSrc;
  }

  get defaultCoverImage() {
    return FoodStoreSrc;
  }
}
