const SyncService = require('./SyncService');


module.exports = class extends SyncService {
  static sendToOwners(socialEntity, event, data) {
    return this.sendToUsers(socialEntity.owners, event, data);
  }

  static sendToManagers(socialEntity, event, data) {
    return this.sendToUsers(socialEntity.managers, event, data);
  }
};
