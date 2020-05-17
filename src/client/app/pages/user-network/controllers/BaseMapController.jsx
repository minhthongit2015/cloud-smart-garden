import MapUtils from '../../../utils/MapUtils';


export default class BaseMapController {
  static userNetwork;

  static google;

  static map;

  static get places() {
    return this.userNetwork.state.places;
  }

  static get markers() {
    return this.userNetwork.markers;
  }

  static GoogleMapHook = ({ google, map }) => {
    this.google = google;
    this.map = map;
    window.map = map;
    this.userNetwork.forceUpdate();
    return null;
  }

  static init(userNetwork) {
    BaseMapController.userNetwork = userNetwork;
  }

  static addMarker(newMarker) {
    return new Promise((resolve) => {
      this.userNetwork.setState(prevState => ({
        places: [newMarker, ...prevState.places]
      }), resolve);
    });
  }

  static addPath(newPath) {
    return new Promise((resolve) => {
      const newMarker = {
        ...newPath,
        marker: MapUtils.getMarkerByType(newPath.__t)
      };
      this.userNetwork.setState(prevState => ({
        places: [newMarker, ...prevState.places]
      }), resolve);
    });
  }

  static removePath(userId, placeId) {
    return new Promise((resolve) => {
      const pathEntity = this.userNetwork.state.places.find(
        place => place.__t === 'Path'
          && place.user && place.user._id === userId
          && place.target && place.target._id === placeId
      );
      if (!pathEntity) {
        return;
      }
      this.userNetwork.setState(prevState => ({
        places: prevState.places.filter(place => place._id !== pathEntity._id)
      }), resolve);
    });
  }
}
