const RouteConstants = require('../utils/RouteConstants');
const t = require('../utils/t');

const titleMap = {
  [RouteConstants.homePath]: 'Beyond Garden',

  [RouteConstants.myGardenPath]: t('pages.myGarden.title.myGarden'),
  [RouteConstants.stationsPath]: t('pages.myGarden.title.stations'),
  [RouteConstants.storehousePath]: t('pages.myGarden.title.storehouse'),
  [RouteConstants.helpMyGardenPath]: t('pages.myGarden.title.help'),

  [RouteConstants.userNetworkPath]: t('pages.userNetwork.title'),

  [RouteConstants.aiCloudPath]: t('pages.aiCloud.title.aiCloud'),
  [RouteConstants.aiProjectsPath]: t('pages.aiCloud.title.projects'),
  [RouteConstants.aiExperimentsPath]: t('pages.aiCloud.title.experiments'),
  [RouteConstants.aiTrainedModelsPath]: t('pages.aiCloud.title.trainedModels'),
  [RouteConstants.aiDatasetsPath]: t('pages.aiCloud.title.datasets'),

  [RouteConstants.nextFeatures]: t('pages.nextFeatures.title.nextFeatures'),
  [RouteConstants.nextTechPath]: t('pages.nextFeatures.title.nextTech'),
  [RouteConstants.nextSpeciesPath]: t('pages.nextFeatures.title.nextSpecies')
};

function getTitleByUrl(pathName) {
  return titleMap[pathName];
}

module.exports = getTitleByUrl;
