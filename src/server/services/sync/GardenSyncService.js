const SocialSyncService = require('./SocialSyncService');


module.exports = class extends SocialSyncService {
  static setStationState(stationId, state = {}) {
    this.sendToStation(stationId, 'setState', state);
  }

  static sendToStation(stationId, event, data = {}) {
    return this.manager.clients
      .filter(client => (
        client.handshake.session.station && client.handshake.session.station._id === stationId
      ))
      .map(client => this.sendVolatileToClient(client, event, data));
  }
};
