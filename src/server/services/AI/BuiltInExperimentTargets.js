const { ExperimentTargets } = require('./utils/AIConstants');
const { ExperimentTarget } = require('./utils/AITypes');


module.exports = [
  new ExperimentTarget(
    ExperimentTargets.light.key,
    ExperimentTargets.light.features,
    ExperimentTargets.light.labels
  )
];
