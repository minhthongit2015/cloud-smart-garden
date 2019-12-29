const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
// const DatasetService = require('../../../services/AI/Dataset');

// router.get('/', (req, res) => {
//   Logger.catch(() => {
//     res.send(new APIResponse().setData([
//       { id: 1, name: 'Realtime Dataset' }
//     ]));
//   }, { req, res });
// });

// router.get('/:datasetId', (req, res) => {
//   Logger.catch(async () => {
//     // const demoData = require('./data');
//     const { limit, offset, sort } = req.query;
//     // const dataset = await DatasetService.list({ limit, offset, sort });
//     res.send(new APIResponse().setData({}));
//   }, { req, res });
// });

// router.put('/:datasetId', (req, res) => {
//   Logger.catch(async () => {
//     const { datasetId } = req.params;
//     const dataset = req.body;
//     await DatasetService.update(datasetId, dataset);
//     res.send(new APIResponse().success());
//   }, { req, res });
// });

module.exports = router;
