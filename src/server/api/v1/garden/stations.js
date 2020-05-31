const router = require('express').Router();
const Logger = require('../../../services/Logger');
const StationService = require('../../../services/garden/StationService');
const SecurityService = require('../../../services/security/SecurityService');
const SessionService = require('../../../services/user/Session');
const APIResponse = require('../../../models/api-models/APIResponse');
const GardenService = require('../../../services/garden/GardenService');
const GardenSyncService = require('../../../services/sync/GardenSyncService');


router.post('/', Logger.catch(async (req, res) => {
  // const post = SecurityService.filterUnallowedProperties(req.body);
  const station = req.body;
  await SecurityService.onlyLoggedInUser(req);
  const { user, session } = SessionService.getEntities(req);
  const { model } = req.query;

  const newStation = await StationService.createOrUpdate({ doc: station, user, model });
  const garden = await GardenService.get({ id: station.garden });
  const currentStations = garden.stations.map(stationI => stationI._id);
  await GardenService.update({
    id: garden._id,
    doc: {
      stations: [...new Set(currentStations.concat(newStation._id || station._id))]
    }
  });
  await SessionService.checkForDirtySession(session);
  return res.send(APIResponse.setData(newStation));
}));

router.get('/:stationId?', Logger.catch(async (req, res) => {
  const { user } = SessionService.getEntities(req);
  const { model } = req.query;
  const { stationId } = req.params;

  const stations = await StationService.getOrList({ id: stationId, opts: req.query, model });

  if (user) {
    await StationService.appendRatingOfUser({ posts: stations, user, model });
  }

  return res.send(APIResponse.setData(stations));
}));

// WS
router.post('/verify', Logger.catch(async (req, res) => {
  const { _id: stationId } = req.body;
  if (!stationId) {
    return res.emit('unauthorized');
  }

  const station = await StationService.get({ id: stationId });
  if (!station) {
    return res.emit('unauthorized');
  }

  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  await SessionService.update(req.session, { station });

  return res.emit('authorized', encodeURIComponent(fullSessionId));
}));

router.post('/:stationId/set-state', Logger.catch(async (req, res) => {
  const { stationId } = req.params;
  GardenSyncService.sendToStation(stationId, 'setState', req.body);
  return res.end();
}));

router.post('/user-plants', Logger.catch(async (req, res) => {
  const { stationId, plant, name } = req.body;
  const station = await StationService.addUserPlant(stationId, plant, name);
  return res.send(APIResponse.setData(station));
}));

router.delete('/user-plants', Logger.catch(async (req, res) => {
  const { userPlantId, stationId } = req.body;
  const station = await StationService.removeUserPlant(userPlantId, stationId);
  return res.send(APIResponse.setData(station));
}));

module.exports = router;
