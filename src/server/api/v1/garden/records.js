const router = require('express').Router();
const SyncService = require('../../../services/sync');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const RecordService = require('../../../services/garden/Record');
const SessionService = require('../../../services/user/Session');
const GardenSecurity = require('../../../services/security/GardenSecurity');
const ApiHelper = require('../../../utils/ApiHelper');
const APIResponse = require('../../../models/api-models/APIResponse');


router.post('/', Logger.catch(async (req, res) => {
  const {
    station, body: state
  } = SessionService.getEntities(req);
  GardenSecurity.onlyVerifiedStation(station);
  GardenSecurity.onlyValidRecord(state);

  const record = { state, station: ApiHelper.getId(station._id) };
  const newRecord = await RecordService.create(record);
  if (newRecord) {
    const station1 = await PostService.get(record.station);
    SyncService.emitToOwner(station1.owner, 'stateChange', record);
  }
  return res.end();
}));

router.get('/', Logger.catch(async (req, res) => {
  const records = await RecordService.list(req.query);
  res.send(APIResponse.setData(records));
}));

module.exports = router;
