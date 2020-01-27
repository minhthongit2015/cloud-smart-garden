const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const DatasetService = require('../../../services/AI/management/Dataset');
const StationService = require('../../../services/garden/Station');


router.get('/:datasetId?', Logger.catch(async (req, res) => {
  const datasets = await DatasetService.getOrList(req.params.datasetId, req.query);
  res.send(APIResponse.setData(datasets));
}));

router.post('/', Logger.catch(async (req, res) => {
  const station = await StationService.first();
  req.body.station = station._id;
  const dataset = await DatasetService.createOrUpdate(req.body);
  return res.send(APIResponse.setData(dataset));
}));

// router.put('/:datasetId', (req, res) => {
//   Logger.catch(async () => {
//     const { datasetId } = req.params;
//     const dataset = req.body;
//     await DatasetService.update(datasetId, dataset);
//     res.send(new APIResponse().success());
//   }, { req, res });
// });

module.exports = router;
