const SocialSyncService = require('./SocialSyncService');


module.exports = class extends SocialSyncService {
  static sendToStation(stationId, event, data) {
    return this.manager.clients
      .filter(client => (
        client.handshake.session.station && client.handshake.session.station._id === stationId
      ))
      .map(client => this.sendVolatileToClient(client, event, data));
  }
};
