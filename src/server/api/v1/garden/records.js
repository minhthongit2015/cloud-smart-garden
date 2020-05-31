const router = require('express').Router();
const Logger = require('../../../services/Logger');
const StationService = require('../../../services/garden/StationService');
const RecordService = require('../../../services/garden/RecordService');
const SessionService = require('../../../services/user/Session');
const GardenSecurity = require('../../../services/security/GardenSecurity');
const APIResponse = require('../../../models/api-models/APIResponse');
const TargetService = require('../../../services/AI/TargetService');
const SocialSync = require('../../../services/sync/SocialSyncService');


router.post('/', Logger.catch(async (req, res) => {
  const {
    station, body: state
  } = SessionService.getEntities(req);
  GardenSecurity.onlyVerifiedStation(station);
  GardenSecurity.onlyValidRecord(state);

  const newRecord = await RecordService.create({ state, station });

  if (newRecord) {
    const station1 = await StationService.get({ id: station });
    if (station1.automated) {
      const predicts = await TargetService.predict(newRecord, station._id);
      if (predicts) {
        res.emit('setState', predicts.state);
      }
      Object.assign(newRecord.state, predicts.state || {});
    }
    SocialSync.sendToOwners(station1, `stateChange-${station1._id}`, newRecord);
  }

  return res.end();
}));

router.get('/', Logger.catch(async (req, res) => {
  const records = await RecordService.list({ opts: req.query });
  return res.send(APIResponse.setData(records));
}));

router.post('/generate', Logger.catch(async (req, res) => {
  const dates = req.body;
  GardenSecurity.onlyNotNullObject(dates && dates.length > 0);
  const station = await StationService.first();
  const records = await RecordService.generateRecordByDates(dates, station._id);
  return res.send(APIResponse.setData(records));
}));

module.exports = router;
