const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SyncService = require('../../../services/sync');
const StationService = require('../../../services/garden/Station');
const SessionService = require('../../../services/user/Session');
const APIResponse = require('../../../models/api-models/APIResponse');

// WS
router.post('/verify', Logger.catch(async (req, res) => {
  const { _id: stationId } = req.body;
  if (!stationId) {
    return res.emit('unauthorized');
  }

  const station = await StationService.get(stationId);
  if (!station) {
    return res.emit('unauthorized');
  }

  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  req.session.station = station;
  return req.session.save(() => res.emit('authorized', encodeURIComponent(fullSessionId)));
}));

router.post('/set-state', Logger.catch(async (req, res) => {
  SyncService.broadcast(req.socket, 'command', req.body);
  res.end();
}));

router.post('/user-plants', Logger.catch(async (req, res) => {
  const { stationId, plant, name } = req.body;
  const station = await StationService.addUserPlant(stationId, plant, name);
  res.send(APIResponse.setData(station));
}));

router.delete('/user-plants', Logger.catch(async (req, res) => {
  const { userPlantId, stationId } = req.body;
  const station = await StationService.removeUserPlant(userPlantId, stationId);
  res.send(APIResponse.setData(station));
}));

module.exports = router;
