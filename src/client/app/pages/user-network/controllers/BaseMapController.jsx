

export default class {
  static userNetwork;

  static init(userNetwork) {
    this.userNetwork = userNetwork;
  }

  static get places() {
    return this.userNetwork.state.places;
  }

  static get markers() {
    return this.userNetwork.markers;
  }
}
