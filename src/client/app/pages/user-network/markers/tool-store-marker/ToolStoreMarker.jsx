/* eslint-disable class-methods-use-this */
import { StoreMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './ToolStoreMarker.scss';

import { ToolStoreSrc } from '../../../../../assets/icons';
import { ToolStoreImgSrc } from '../../../../../assets/images';
import demoTools from './demotools';

export default class ToolStoreMarker extends StoreMarker {
  get customClass() {
    return MarkerTypes.toolStore;
  }

  get markerIcon() {
    return ToolStoreSrc;
  }

  get defaultCoverImage() {
    return ToolStoreImgSrc;
  }

  get placeTypeTitle() {
    return 'cửa hàng vật dụng';
  }

  getGoods() {
    return demoTools;
  }
}
