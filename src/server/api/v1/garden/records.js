const router = require('express').Router();
const SyncService = require('../../../services/sync');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/PostService');
const StationService = require('../../../services/garden/StationService');
const RecordService = require('../../../services/garden/RecordService');
const SessionService = require('../../../services/user/Session');
const GardenSecurity = require('../../../services/security/GardenSecurity');
const APIResponse = require('../../../models/api-models/APIResponse');
const TargetService = require('../../../services/AI/TargetService');


router.post('/', Logger.catch(async (req, res) => {
  const {
    station, body: state
  } = SessionService.getEntities(req);
  GardenSecurity.onlyVerifiedStation(station);
  GardenSecurity.onlyValidRecord(state);

  const newRecord = await RecordService.create({ state, station });

  if (newRecord) {
    const station1 = await PostService.get({ id: station });
    SyncService.emitToOwner(station1.owner, 'stateChange', newRecord);
    const predicts = await TargetService.predict(newRecord, station._id);
    if (predicts) {
      res.emit('setState', predicts.state);
    }
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
