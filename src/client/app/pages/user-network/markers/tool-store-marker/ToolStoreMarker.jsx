/* eslint-disable class-methods-use-this */
import { StoreMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './ToolStoreMarker.scss';

import { ToolStoreSrc } from '../../../../../assets/icons';
import { ToolStoreSrc as ToolStoreImageSrc } from '../../../../../assets/images';

export default class ToolStoreMarker extends StoreMarker {
  get customClass() {
    return MarkerTypes.toolStore;
  }

  get markerIcon() {
    return ToolStoreSrc;
  }

  get defaultCoverImage() {
    return ToolStoreImageSrc;
  }
}
