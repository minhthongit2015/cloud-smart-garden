

const Gardener = require('./services/gardener');

module.exports = async function startUp() {
  Gardener.startWorking();
};
