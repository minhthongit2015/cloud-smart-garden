import React from 'react';
import BaseComponent from '../../../components/_base/BaseComponent';
import UserService from '../../../services/user/UserService';
import MapController from '../controllers/MapController';
import { Polyline } from '../../../components/map';
import MapUtils from '../../../utils/MapUtils';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.handleMarkerRef = this.handleMarkerRef.bind(this);
  }

  handleMarkerRef(ref) {
    if (!ref) return;
    ref.place.ref = ref;
    this.dispatchEvent({ typez: 'ref' }, ref);
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const {
      google, map, mainMap, places
    } = this.props;
    if (!google || !map) return null;

    return (
      <>
        {places.map((place) => {
          if (place.marker && place.__t !== 'Path') {
            return (
              <place.marker
                key={place._id || Math.random()}
                google={google}
                map={map}
                mainMap={mainMap}
                ref={this.handleMarkerRef}
                place={place}
                markerProps={{}}
                circleProps={{}}
                popupProps={{}}
                draggable={UserService.isModOrAdmin}
                onDragend={(markerProps, mapz, event) => {
                  MapController.handleMoveMarker(markerProps, mapz, event, place);
                }}
                onOpen={MapController.handleOpenMarker}
                onClose={MapController.handleCloseMarker}
                onSelect={MapController.handleSelectToBuy}
                onFocus={MapController.handleFocusMarker}
              />
            );
          }
          if (place.__t === 'Path') {
            return (
              <Polyline
                google={google}
                map={map}
                key={place._id || Math.random()}
                mainMap={mainMap}
                path={place.path}
                opacity={0.8}
                width={2}
                {...MapUtils.getPathStyleByType(place.type)}
              />
            );
          }
          return null;
        })}
      </>
    );
  }
}
