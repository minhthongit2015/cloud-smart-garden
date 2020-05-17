/* eslint-disable no-param-reassign */
import React from 'react';
import BasePage from '../_base/BasePage';

import GGMap from '../../components/map/Map';
import MapService from '../../services/map/MapService';
import t from '../../languages';
import UserService from '../../services/user/UserService';
import MapContextMenu from './utils/MapContextMenu';
import MapUtils from '../../utils/MapUtils';
import MapController from './controllers/MapController';
import MapRightFloatingPanel from './utils/MapRightFloatingPanel';
import MapShoppingCart from './utils/MapShoppingCart';
import ZoomTool from '../../components/map-tools/zoom-tool/ZoomTool';
import './UserNetwork.scss';
import MapElements from './components/MapElements';


export default class UserNetwork extends BasePage {
  constructor(props) {
    super(props, t('pages.userNetwork.title'));
    this.mapRef = React.createRef();
    this.mapCtxMenuRef = React.createRef();
    this.rightToolbarRef = React.createRef();
    this.shoppingCartRef = React.createRef();
    this.zoomToolRef = React.createRef();

    this.bind(
      this.handleMapReady,
      this.handleMarkerRef
    );

    MapController.init(this);

    const center = [15.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      // zoom: 17
      zoom: 5
    };
    this.markers = new Set();
    this.state = {
      places: []
    };
    UserService.useUserState(this);
  }

  componentWillUnmount() {
    console.log('dispose');
  }

  handleMapReady() {
    MapController.map.setMapTypeId(MapController.google.maps.MapTypeId.SATELLITE);
    MapController.map.setOptions({
      restriction: {
        latLngBounds: {
          north: 85.45, south: -85.45, west: -180, east: 180
        },
        strictBounds: true
      },
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: true,
      streetViewControl: true
    });
    this.fetchPlaces().then((places) => {
      // CategoryService.fetchCategories();
      MapService.checkOpenCurrentPlace(places);
    });
    this.zoomToolRef.current.forceUpdate();
  }

  fetchPlaces() {
    return new Promise(async (resolve) => {
      const places = await MapService.list();
      places.forEach((place) => {
        place.marker = MapUtils.getMarkerByType(place.__t);
      });
      this.setState({
        places
      }, () => resolve(places));
    });
  }

  handleMarkerRef(event, ref) {
    this.markers.add(ref);
  }

  refresh() {
    this.forceUpdate();
  }

  closeAll() {
    this.markers.forEach(marker => marker && marker.close());
  }

  render() {
    const { places } = this.state;

    if (!window.MyGoogleMap) {
      window.MyGoogleMap = (
        <GGMap
          ref={this.mapRef}
          google={this.props.google || window.google}
          {...this.defaultMapProps}
          onClick={MapController.handleMapClick}
          onRightclick={MapController.handleRightClick}
          onZoom_changed={MapController.handleZoomChange}
          onReady={this.handleMapReady}
        >
          {<MapController.GoogleMapHook />}
          {/* {true && <LeftToolBar handler={MapController.handleLeftToolbarAction} />} */}
          <MapRightFloatingPanel
            ref={this.rightToolbarRef}
            items={places}
            onSelect={MapController.handleRightToolbarAction}
            onOpen={MapController.handleOpenPanel}
            onClose={MapController.handleClosePanel}
            onClick={MapController.handleClickPanel}
            small
          />
          <MapShoppingCart
            ref={this.shoppingCartRef}
            items={places}
            onSelect={MapController.handleRightToolbarAction}
            onOpen={MapController.handleOpenPanel}
            onClose={MapController.handleClosePanel}
            onClick={MapController.handleClickPanel}
            small
          />
          <MapContextMenu
            ref={this.mapCtxMenuRef}
            mainMap={this}
            onSelect={MapController.handleContextActions}
          />
          <ZoomTool id="main-zoom-tool" ref={this.zoomToolRef} zoom={5} />
        </GGMap>
      );
    }

    return (
      <div {...this.props} onKeyDown={MapController.handleHotkeys}>
        {window.MyGoogleMap}
        <MapElements
          google={MapController.google}
          map={MapController.map}
          places={places}
          mainMap={this}
          onRef={this.handleMarkerRef}
        />
      </div>
    );
  }
}
