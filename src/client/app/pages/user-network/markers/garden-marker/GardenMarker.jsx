/* eslint-disable class-methods-use-this */
import React from 'react';
import { PageMarker } from '../../../../components/map';
import { MarkerTypes } from '../../../../utils/Constants';
import './GardenMarker.scss';

import { GardenSrc } from '../../../../../assets/icons';
import { GardenImgSrc } from '../../../../../assets/images';
import RouteConstants from '../../../../utils/RouteConstants';
import MapLink from '../../../../components/map-tools/map-link/MapLink';
import Section from '../../../../layouts/base/section/Section';
import GoodsList from '../../../../components/utils/item-list/GoodsList';
import demogoods from '../../../../components/map/built-in-markers/demogoods';

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

  constructor(props) {
    super(props);
    this.bind(this.handleSelectItem);
  }

  handleSelectItem(event, item) {
    this.dispatchEvent(event, item, this);
  }

  renderBody() {
    const { place: { content, goods } = {} } = this.props;
    return (
      <>
        <Section title="Giới Thiệu" beautyFont className="text-center" small>
          <div className="my-2 text-pre-wrap text-1 text-dark-blue-green">
            <i>{content}</i>
          </div>
          <div>
            <MapLink to={RouteConstants.myGardenLink}>
              <i className="fas fa-house-user" /> Đến Thăm Vườn
            </MapLink>
          </div>
        </Section>
        <Section title="Chia Sẻ Rau Củ" beautyFont small className="mt-3">
          <GoodsList items={demogoods || goods} onSelect={this.handleSelectItem} />
        </Section>
      </>
    );
  }
}
