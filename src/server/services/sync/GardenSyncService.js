const SocialSyncService = require('./SocialSyncService');
const SyncEvents = require('./SyncEvents');


module.exports = class extends SocialSyncService {
  static setStationState(stationId, state = {}) {
    this.sendToStation(stationId, SyncEvents.setState, state);
  }

  static manualSetStationState(stationId, state = {}) {
    this.sendToStation(stationId, SyncEvents.manualSetState, state);
  }

  static requestStationState(stationId) {
    this.sendToStation(stationId, SyncEvents.requestState);
  }

  static dispatchStationStateToViewers(station, state) {
    this.sendToAll(SyncEvents.stateChange(station._id), state);
  }

  static sendToStation(stationId, event, data = {}) {
    return this.manager.clients
      .filter(client => (
        client.handshake.session.station && client.handshake.session.station._id === stationId
      ))
      .map(client => this.sendVolatileToClient(client, event, data));
  }
};
