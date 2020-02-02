/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithPopup from '../marker-with-popup/MarkerWithPopup';
import ZoomTool from '../../map-tools/zoom-tool/ZoomTool';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import './Place.scss';

import { FarmSrc as FarmIconSrc } from '../../../../assets/icons';
import { FarmImgSrc } from '../../../../assets/images';


export default class Place extends MarkerWithPopup {
  get place() {
    return this.props.place;
  }

  get customClass() {
    return 'place';
  }

  get placeTypeTitle() {
    return '';
  }

  get circleProps() {
    const { place: { position: center, radius } = {} } = this.props;
    return {
      ...super.circleProps,
      center,
      radius
    };
  }

  get markerProps() {
    const { place: { name, position } = {} } = this.props;
    return {
      ...super.markerProps,
      name,
      position
    };
  }

  get markerIcon() {
    return FarmIconSrc;
  }

  get defaultCoverImage() {
    return FarmImgSrc;
  }

  renderZoomTool() {
    const { place: { zoom } = {} } = this.props;
    return <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />;
  }

  renderHeader() {
    const {
      place: {
        name: placeName,
        cover,
        zoom = 17
      } = {}
    } = this.props;
    const defaultCover = '/images/cover-photo.jpg';

    return (
      <div className="marker__place">
        <div className="marker__place__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
          <img alt="" src={cover || defaultCover} />
          <ZoomTool zoom={zoom} zoomTo={this.zoomTo} />
        </div>
        <div className="marker__place__name">
          {placeName}
        </div>
      </div>
    );
  }

  renderBody() {
    const { place = {} } = this.props;

    return (
      <div className="marker__place px-3 pb-3">
        {place.name}
      </div>
    );
  }

  renderContent() {
    return (
      <React.Fragment>
        <div className="marker__header">
          {this.renderHeader()}
        </div>
        <div className="marker__body">
          {this.renderBody()}
          <PlaceActions place={this.props.place} marker={this} />
        </div>
      </React.Fragment>
    );
  }
}

Place.propTypes = {
  place: PropTypes.object.isRequired
};

Place.defaultProps = {
  place: null
};
