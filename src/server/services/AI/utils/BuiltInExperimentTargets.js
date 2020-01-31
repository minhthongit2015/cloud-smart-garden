const { ExperimentTargets } = require('./AIConstants');
const { ExperimentTarget } = require('./AITypes');
const DataUtils = require('../ai-core/DataUtils');


module.exports = [
  new ExperimentTarget(
    ExperimentTargets.light.key,
    [
      ['state.light', DataUtils.toNumber.id]
    ],
    [
      ['state.led', DataUtils.toNumber.id],
      ['state.led', DataUtils.toInverse.id, DataUtils.toNumber.id]
    ]
  )
];
