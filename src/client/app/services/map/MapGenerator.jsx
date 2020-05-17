import Random from '../../utils/Random';


export default class {
  static generatePathToPlace(fromPlace, toPlace) {
    return this.generatePath({
      from: fromPlace.position,
      to: toPlace.position,
      title: 'from A to B'
    });
  }

  static generatePath({
    from, to, _id, title
  }) {
    return {
      _id: _id || Random.hex(8),
      __t: 'Path',
      type: 'Path',
      name: title,
      path: [from, to]
    };
  }

  static generateStrikeRoutePath(place) {
    const strikePathEntity = this.generatePathEntity(place);
    strikePathEntity.path = this.getPathFromStart(place);
    strikePathEntity.type = 'Strike';
    return strikePathEntity;
  }

  static getPathFromStart(startPlace) {
    const path = [];
    let prev;
    while (startPlace) {
      startPlace.prev = prev;
      path.push(startPlace.position);
      prev = startPlace;
      startPlace = startPlace.next;
    }
    return path;
  }

  static generateStrikerPath(places, userId, place) {
    const userMarker = places.find(
      placez => placez.__t === 'Activist' && (placez.user || placez.author)._id === userId
    );
    if (!userMarker) {
      return null;
    }
    const memberPathEntity = this.generatePathEntity(place);
    memberPathEntity.path = [userMarker.position, place.position];
    memberPathEntity.type = 'Activist-Strike';
    memberPathEntity.user = userMarker.user || userMarker.author;
    memberPathEntity.target = place;
    return memberPathEntity;
  }

  static generatePathEntity(place) {
    return {
      _id: `${place && place._id}${Math.round(Math.random() * 10000000)}`,
      __t: 'Path',
      type: 'Path',
      name: place && place.title,
      path: []
    };
  }
}
